const { Circle, Triangle, Square } = require('./shapes');

describe('Shape classes', () => {
  test('Circle renders correctly', () => {
    const circle = new Circle();
    circle.setColor('blue');
    expect(circle.render()).toBe('<circle cx="150" cy="100" r="80" fill="blue" />');
  });

  test('Triangle renders correctly', () => {
    const triangle = new Triangle();
    triangle.setColor('blue');
    expect(triangle.render()).toBe('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
  });

  test('Square renders correctly', () => {
    const square = new Square();
    square.setColor('blue');
    expect(square.render()).toBe('<rect x="90" y="40" width="120" height="120" fill="blue" />');
  });
});
