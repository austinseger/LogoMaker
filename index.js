const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const prompt = inquirer.createPromptModule();

class Shape {
  constructor() {
    this.color = '';
  }
  setColor(color) {
    this.color = color;
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="90" y="40" width="120" height="120" fill="${this.color}" />`;
  }
}

const generateSVG = (text, textColor, shape) => {
  return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
};

const runApp = async () => {
  const answers = await prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => input.length <= 3 || 'Text must be 3 characters or fewer.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter a text color (keyword or hex):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hex):',
    },
  ]);

  let shape;
  switch (answers.shape) {
    case 'Circle':
      shape = new Circle();
      break;
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Square':
      shape = new Square();
      break;
  }

  shape.setColor(answers.shapeColor);

  const svgContent = generateSVG(answers.text, answers.textColor, shape);

  const filePath = path.join(__dirname, 'examples', 'logo.svg');

  fs.writeFileSync(filePath, svgContent);

  console.log('Generated logo.svg in the examples/ folder.');
};

runApp();
