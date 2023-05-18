// To be free from canvas size
// Turn every coordinates in width & height
// Put coordinate of x at end in xmax
// Put coordinate of y at end in ymax
let width = 500;
let height = 500;
let xmax = width/2;
let ymax = height/2;
let xymax = (xmax + ymax) / 2;

// Graph at Descartes Coordinate System
// Let's set function f(x)
// When do a translation about function,
// The Fomula of translation would be
// p * f(k * x - a) + b
// Set p, k, a, b as variable
let input_p;
let input_k;
let slider_a;
let slider_b;

function f(x) {
    // Save equation in variable fx 
    let fx = x ** 2
    return fx;
}

function descartesInput() {
    // Set Inputs of variables
    input_p = createInput('1'); // Initial Value = 1
    input_p.position(20, height -100);
    input_p.size(90);
    input_p.input(myInputEvent);
    
    input_k = createInput('1'); // Initial Value = 1
    input_k.position(20, height - 70);
    input_k.size(90);
    input_k.input(myInputEvent);
    
    slider_a = createSlider(-xmax, xmax, 0, 1);
    slider_a.position(20, height - 40);
    slider_a.style('width', '100px');
    
    slider_b = createSlider(-ymax, ymax, 0, 1);
    slider_b.position(20, height - 20);
    slider_b.style('width', '100px');
}

// function for draing descartes graph
function descartesDraw() {
    // Get values from input
    p = float(input_p.value());
    k = float(input_k.value());
    a = slider_a.value();
    b = slider_b.value();

    noFill(); // Not Filled, Only draw line
    beginShape();
    // -xmax -> left end of x axis
    // xmax -> right end of x axis
    // Step = 1
    for(let x = -xmax; x <= xmax; x += 1) {
        let y = p * f((k * x) - a) + b; // Equation
        vertex((10*x) + xmax, -(10*y) + ymax);
    }
    endShape();
}

// Graph at Polar Coordinate System
// Let's set function g(theta)
// Coordinate of x is r * cos(theta)
// Coordinate of y is r * sin(theta)
// theta is radian and range(0, d * PI)
// Set Scale of graph
// polarScale * rx
// polarScale * ry
// Set d, polar_scale as variable
let slider_d;
let slider_polarScale;


function g(theta) {
    // Save equation in variable gtheta
    let gtheta = sin((8 * theta) / 5);
    return gtheta;
}

function polarInput() {
    slider_d = createSlider(0, 20, 10, 0.1);
    slider_d.position(20, height - 60);
    slider_d.style('width', '100px');

    // Slider for scale range(0, 200), step = 5
    slider_polarScale = createSlider(0, xymax, xymax/2, 5);
    slider_polarScale.position(20, height - 40);
    slider_polarScale.style('width', '100px');
}

// function for drawing polar graph
function polarDraw() {
    // Get values from input
    d = slider_d.value();
    polarScale = slider_polarScale.value();

    noFill(); // Not Filled, Only draw line
    beginShape();
    // Sampling range(0, d*PI)
    // Step = PI/180 = 1 dgree
    for(let theta = 0; theta <= d*PI; theta += PI/180) {
        let r = g(theta);
        let rx = polarScale * r * cos(theta);
        let ry = polarScale * r * sin(theta);
        vertex(rx + xmax, -ry + ymax);
    }
    endShape();
}

// Funtion for Event about input
function myInputEvent() {
    console.log('', this.value());
}

function setup() {
    // Set canvas size 400 * 400
    // Coordinate of Left top is (0, 0)
    // Coordinate of Right bottom is (width, height)
    // Therefore, Coordinate of center is (xmax, ymax)
    createCanvas(width, height);
    
    // Set Unit of Angle as Radian
    angleMode(RADIANS);
    
    //descartesInput();
    polarInput();
}

function draw() {
    // Setting background color as white
    background(255);
    line(0, ymax, width, ymax); // Drawing x axis
    line(xmax, 0, xmax, height); // Drawing y axis
    textSize(15);
    text('O', xmax - 20, ymax + 20);
    
    // Drawing arrow for x axis
    beginShape();
    fill(0); // Black
    vertex(width, ymax);
    vertex(width -5, ymax + 5);
    vertex(width -5, ymax - 5);
    vertex(width, ymax);
    endShape();
    textSize(15);
    text('x', width -10, ymax + 15); // Show name of axis
    
    // Drawing arrow for y axis
    beginShape();
    fill(0); // Black
    vertex(xmax, 0);
    vertex(xmax - 5, 5);
    vertex(xmax + 5, 5);
    vertex(xmax, 0);
    endShape();
    textSize(15);
    text('y', xmax + 15, 10); // Show name of axis
    
    // Drawing Graph
    //descartesDraw();
    polarDraw();
}