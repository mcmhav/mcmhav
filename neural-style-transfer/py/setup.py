from setuptools import setup, find_packages

# with open('README.rst') as f:
#   readme = f.read()

# with open('LICENSE') as f:
#  license = f.read()

setup(
  name='sample',
  version='0.1.0',
  description='Sample package for Python-Guide.org',
  # long_description=readme,
  author='cake',
  author_email='cake@cake.cake',
  url='https://github.com/mcmhav/mcmhav',
  # license=license,
  packages=find_packages(exclude=('tests', 'docs'))
)
