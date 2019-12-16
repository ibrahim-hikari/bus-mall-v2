`use strict`;

function Products(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.showCtr = 0;
    Products.all.push(this);
}

Products.roundCtr = 0;
Products.roundLimit = 25;

Products.all = [];

Products.left = null;
Products.center = null;
Products.right = null;

new Products('Bag', 'images/bag.jpg');
new Products('Banana', 'images/banana.jpg');
new Products('Bathroom', 'images/bathroom.jpg');
new Products('Boots', 'images/boots.jpg');
new Products('breakfast', 'images/breakfast.jpg');
new Products('bubblegum', 'images/bubblegum.jpg');
new Products('chair', 'images/chair.jpg');
new Products('cthulhu', 'images/cthulhu.jpg');
new Products('dog-duck', 'images/dog-duck.jpg');
new Products('dragon', 'images/dragon.jpg');
new Products('pen', 'images/pen.jpg');
new Products('pet-sweep', 'images/pet-sweep.jpg');
new Products('scissors', 'images/scissors.jpg');
new Products('shark', 'images/shark.jpg');
new Products('sweep', 'images/sweep.png');
new Products('tauntaun', 'images/tauntaun.jpg');
new Products('unicorn', 'images/unicorn.jpg');
new Products('usb', 'images/usb.gif');
new Products('water-can', 'images/water-can.jpg');
new Products('wine-glass', 'images/wine-glass.jpg');

function render() {
    let seen = [Products.left, Products.center, Products.right]

    do {
        Products.left = randomizer();
    } while (seen.includes(Products.left));
    seen.push(Products.left)

    do {
        Products.center = randomizer();
    } while (seen.includes(Products.center));
    seen.push(Products.center)

    do {
        Products.right = randomizer()
    } while (seen.includes(Products.right));
    seen.push(Products.right);

    Products.left.showCtr++;
    Products.center.showCtr++;
    Products.right.showCtr++;

    $('#left-image').attr('src', Products.left.src);
    $('#left-image').attr('alt', Products.left.title);
    $('#left-title').text(Products.left.title);

    $('#center-image').attr('src', Products.center.src);
    $('#center-image').attr('alt', Products.center.title);
    $('#center-title').text(Products.center.title);

    $('#right-image').attr('src', Products.right.src);
    $('#right-image').attr('alt', Products.right.title);
    $('#right-title').text(Products.right.title);
}

render()

function randomizer() {
    let randomIndex = Math.floor(Math.random() * Products.all.length);
    return Products.all[randomIndex]
}

function renderList() {

    $('#report').html('');

    for (let i = 0; i < Products.all.length; i++) {

        let singleProduct = Products.all[i];
        let content = `${singleProduct.title} had ${singleProduct.clickCtr} votes and was shown ${singleProduct.showCtr} times`

        $('#report').append(`<li class = "${singleProduct.title}">${content}</li>`);
    }
}

$('#container').click(function (event) {
    event.preventDefault();

    let clicked = event.target.id;
    let chosen;
    // set

    if (clicked === 'left-image') {
        chosen = Products.left;
    } else if (clicked === 'center-image') {
        chosen = Products.center
    } else if (clicked === 'right-image') {
        chosen = Products.right;
    } else {
        alert('What in the earth are you clicking on !!!');
    }

    if (chosen) {
        chosen.clickCtr++;
        Products.roundCtr++;

        renderList()

        if (Products.roundCtr === Products.roundLimit) {
            alert('That is enough')
            renderChart();
            $('#container').off('click')
        } else {
            render();
        }
    }
});

function renderChart() {

    // Modified from https://jsfiddle.net/nagix/bL8hpk6n/

    let titleArr = [];
    let clickArr = [];
    let showArr = [];

    for (let i = 0; i < Products.all.length; i++) {
        let currentProduct = Products.all[i];
        titleArr.push(currentProduct.title);
        clickArr.push(currentProduct.clickCtr)
        showArr.push(currentProduct.showCtr)
    }
    var data = {
        labels: titleArr,
        datasets: [{
            label: "Clicked",
            backgroundColor: 'rgba(21, 231, 39, 0.411)',
            borderWidth: 1,
            data: clickArr,
            xAxisID: "bar-x-axis1",
        }, {
            label: "Shown",
            backgroundColor: 'rgba(211, 51, 51, 0.424)',
            borderWidth: 1,
            data: showArr,
            xAxisID: "bar-x-axis2",
        }]
    };

    var options = {
        legend: {
            labels: {
                fontColor: "yellow",
                fontSize: 18
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: 'Yellow'
                },
                stacked: true,
                id: "bar-x-axis1",
                barThickness: 20,
            }, {
                display: false,
                stacked: true,
                id: "bar-x-axis2",
                barThickness: 40,
                // these are needed because the bar controller defaults set only the first x axis properties
                type: 'category',
                categoryPercentage: 0.8,
                barPercentage: 0.9,
                gridLines: {
                    offsetGridLines: true
                },
                offset: true
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    beginAtZero: true
                },
            }]

        }
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

renderList();
render();
renderChart();

