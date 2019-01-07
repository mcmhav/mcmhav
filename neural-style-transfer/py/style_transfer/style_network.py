# import os
# import sys
# import scipy.io
# import scipy.misc
# import matplotlib.pyplot as plt
# from matplotlib.pyplot import imshow
# from PIL import Image
# from nst_utils import *
# import numpy as np
# import tensorflow as tf

import os
import sys
import numpy as np
import scipy.io
import scipy.misc
import tensorflow as tf
from PIL import Image

from load_vgg_model import load_vgg_model

###############################################################################
# Constants for the image input and output.
###############################################################################

# Output folder for the images.
OUTPUT_DIR = '../output/'
# Style image to use.
# STYLE_IMAGE = 'images/starry_night.jpg'
STYLE_IMAGE = '../images/lion.jpg'
# Content image to use.
# CONTENT_IMAGE = 'images/hong_kong_2.jpg'
CONTENT_IMAGE = '../images/jenni.jpg'
# Image dimensions constants.
IMAGE_WIDTH = 800
IMAGE_HEIGHT = 600
COLOR_CHANNELS = 3

###############################################################################
# Algorithm constants
###############################################################################
# Noise ratio. Percentage of weight of the noise for intermixing with the
# content image.
NOISE_RATIO = 0.6
# Number of iterations to run.
ITERATIONS = 300
# Constant to put more emphasis on content loss.
BETA = 5
# Constant to put more emphasis on style loss.
ALPHA = 100
# Path to the deep learning model. This is more than 500MB so will not be
# included in the repository, but available to download at the model Zoo:
# Link: https://github.com/BVLC/caffe/wiki/Model-Zoo
#
# Pick the VGG 19-layer model by from the paper "Very Deep Convolutional
# Networks for Large-Scale Image Recognition".
VGG_MODEL = '../imagenet-vgg-verydeep-19.mat'
# The mean to subtract from the input to the VGG model. This is the mean that
# when the VGG was used to train. Minor changes to this will make a lot of
# difference to the performance of model.
MEAN_VALUES = np.array([123.68, 116.779, 103.939]).reshape((1,1,1,3))

def generate_noise_image(content_image, noise_ratio = NOISE_RATIO):
  """
  Returns a noise image intermixed with the content image at a certain ratio.
  """
  noise_image = np.random.uniform(
          -20, 20,
          (1, IMAGE_HEIGHT, IMAGE_WIDTH, COLOR_CHANNELS)).astype('float32')
  # White noise image from the content representation. Take a weighted average
  # of the values
  input_image = noise_image * noise_ratio + content_image * (1 - noise_ratio)
  return input_image

def load_image(path):
  # Resize the image for convnet input, there is no change but just
  # add an extra dimension.

  try:
    img = Image.open(path)
    img = img.resize((IMAGE_WIDTH, IMAGE_HEIGHT), Image.ANTIALIAS)
    img.save(path + "tmp", "JPEG")
  except IOError:
    print("cannot create thumbnail for")

  image = scipy.misc.imread(path + "tmp")

  # image = np.reshape(image, (IMAGE_HEIGHT, IMAGE_WIDTH))
  image = np.reshape(image, ((1,) + image.shape))
  # Input to the VGG model expects the mean to be subtracted.
  image = image - MEAN_VALUES
  return image

def save_image(path, image):
  # Output should add back the mean.
  image = image + MEAN_VALUES
  # Get rid of the first useless dimension, what remains is the image.
  image = image[0]
  image = np.clip(image, 0, 255).astype('uint8')
  scipy.misc.imsave(path, image)

def content_loss_func(sess, model):
  """
  Content loss function as defined in the paper.
  """
  def _content_loss(p, x):
      # N is the number of filters (at layer l).
      N = p.shape[3]
      # M is the height times the width of the feature map (at layer l).
      M = p.shape[1] * p.shape[2]
      # Interestingly, the paper uses this form instead:
      #
      #   0.5 * tf.reduce_sum(tf.pow(x - p, 2))
      #
      # But this form is very slow in "painting" and thus could be missing
      # out some constants (from what I see in other source code), so I'll
      # replicate the same normalization constant as used in style loss.
      return (1 / (4 * N * M)) * tf.reduce_sum(tf.pow(x - p, 2))
  return _content_loss(sess.run(model['conv4_2']), model['conv4_2'])

def style_loss_func(sess, model):
  """
  Style loss function as defined in the paper.
  """
  def _gram_matrix(F, N, M):
      """
      The gram matrix G.
      """
      Ft = tf.reshape(F, (M, N))
      return tf.matmul(tf.transpose(Ft), Ft)

  def _style_loss(a, x):
      """
      The style loss calculation.
      """
      # N is the number of filters (at layer l).
      N = a.shape[3]
      # M is the height times the width of the feature map (at layer l).
      M = a.shape[1] * a.shape[2]
      # A is the style representation of the original image (at layer l).
      A = _gram_matrix(a, N, M)
      # G is the style representation of the generated image (at layer l).
      G = _gram_matrix(x, N, M)
      result = (1 / (4 * N**2 * M**2)) * tf.reduce_sum(tf.pow(G - A, 2))
      return result

  # Layers to use. We will use these layers as advised in the paper.
  # To have softer features, increase the weight of the higher layers
  # (conv5_1) and decrease the weight of the lower layers (conv1_1).
  # To have harder features, decrease the weight of the higher layers
  # (conv5_1) and increase the weight of the lower layers (conv1_1).
  layers = [
    ('conv1_1', 0.5),
    ('conv2_1', 1.0),
    ('conv3_1', 1.5),
    ('conv4_1', 3.0),
    ('conv5_1', 4.0),
  ]

  E = [_style_loss(sess.run(model[layer_name]), model[layer_name]) for layer_name, _ in layers]
  W = [w for _, w in layers]
  loss = sum([W[l] * E[l] for l in range(len(layers))])
  return loss


if __name__ == '__main__':
  with tf.Session() as sess:
    # Load the images.
    content_image = load_image(CONTENT_IMAGE)
    style_image = load_image(STYLE_IMAGE)
    # Load the model.
    model = load_vgg_model(VGG_MODEL)

    # Generate the white noise and content presentation mixed image
    # which will be the basis for the algorithm to "paint".
    input_image = generate_noise_image(content_image)

    # sess.run(tf.initialize_all_variables())
    sess.run(tf.initializers.global_variables())

    # Construct content_loss using content_image.
    sess.run(model['input'].assign(content_image))
    content_loss = content_loss_func(sess, model)

    # Construct style_loss using style_image.
    sess.run(model['input'].assign(style_image))
    style_loss = style_loss_func(sess, model)

    # Instantiate equation 7 of the paper.
    total_loss = BETA * content_loss + ALPHA * style_loss

    # From the paper: jointly minimize the distance of a white noise image
    # from the content representation of the photograph in one layer of
    # the neywork and the style representation of the painting in a number
    # of layers of the CNN.
    #
    # The content is built from one layer, while the style is from five
    # layers. Then we minimize the total_loss, which is the equation 7.
    optimizer = tf.train.AdamOptimizer(2.0)
    train_step = optimizer.minimize(total_loss)

    # sess.run(tf.initialize_all_variables())
    sess.run(tf.initializers.global_variables())

    sess.run(model['input'].assign(input_image))
    for it in range(ITERATIONS):
      sess.run(train_step)
      if it % 50 == 0:
        # Print every 100 iteration.
        mixed_image = sess.run(model['input'])
        print('Iteration %d' % (it))
        print('sum : ', sess.run(tf.reduce_sum(mixed_image)))
        print('cost: ', sess.run(total_loss))

        if not os.path.exists(OUTPUT_DIR):
          os.mkdir(OUTPUT_DIR)

        filename = '%s/%d.png' % (OUTPUT_DIR, it)
        save_image(filename, mixed_image)
