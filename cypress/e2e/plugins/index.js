import cucumber from 'cypress-cucumber-preprocessor';

export default function setup(on, _config) {
  on('file:preprocessor', cucumber());
}
