let phones = [
    {id: 1, title: 'iPhone', price: 1250, img: 'https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/36/3640893/iPhone-13-Pro-5G_6.1-120Hz-Alpejska-zielen-01.jpg'},
    {id: 2, title: 'Samsung', price: 890, img: 'https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/32/3230010/Smartfon-SAMSUNG-Galaxy-S21-FE-5G-Lawendowy-front-tyl.jpg'},
    {id: 3, title: 'Huawei', price: 200, img: 'https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/38/3866670/Smartfon-Huawei-Nova-Y70-Niebieski-Front-Plecki.jpg'},
    {id: 4, title: 'Nokia', price: 250, img: 'https://prod-api.mediaexpert.pl/api/images/gallery_500_500/thumbnails/images/20/2082045/Telefon-NOKIA-105-2019-Dual-SIM-Czarny.jpg'}
]

const toHTML = phone => `
<div class="col">
                <div class="card">
                    <img class="card-img-top" style="height: 300px;" src="${phone.img}" alt="${phone.title}">
                    <div class="card-body">
                        <h5 class="card-title">${phone.title}</h5>
                        <a href="#" class="btn btn-primary" data-btn="price" data-id="${phone.id}">View the price</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${phone.id}">Remove</a>
                    </div>
                </div>
            </div>
` 




function render() {
    const html = phones.map(toHTML).join(' ')
    document.querySelector('#Phone').innerHTML = html
}

render()


const priceModal = $.modal( {
    title: 'The price of the product:',
    closable: true,
    with: '400px',
    footerButtons: [
        {text: 'To close', type: 'primery', handler() {
            priceModal.close()
        }}
        
    ]
})




document.addEventListener( 'click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const phone = phones.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Price for ${phone.title}: <strong>${phone.price}$</strong></p>
        `) 
        priceModal.open()
    } else if (btnType === 'remove') {  
        $.confirm( {
            title: 'Are you sure?',
            content: `<p>You delete: <strong>${phone.title}</strong></p>`
        }).then(() => {
            phones = phones.filter(f => f.id !== id)
            render()
        }).catch( () => {
            console.log('Cancel');
        })    
    }
})