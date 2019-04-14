// ------------------ set up local variables -----------------------------------------------------------------
const startPositionX = -13.459;
const startPositionZ = -8.520;

function setup () {
    console.log("setting up from js");

    const sceneElement = document.querySelector('a-scene');

    // -------------- add a product element for each product that we get ---------------------------------------------
    const products = productList.storeItems;
    console.log("prod size", products.size);
    console.log("prod len", products.length);

    const sqrt = Math.ceil(Math.sqrt(products.length)) ; //holds the sqrt rounded up of product
    console.log("Sqrt of num products is ", sqrt);

    for (var i = 0; i < products.length; i++) {

        // get the allocation on our pseudo-grid for this product tree
        const row = Math.floor(i / sqrt);
        const column = i % sqrt;

        //get the product and put it there
        const thisProduct = products[i];
        const productElement = generateProductTree(row, column, thisProduct.name, thisProduct.description, thisProduct.price, thisProduct.mainMedia);
        sceneElement.appendChild(productElement);
    }
}

/*
 * Given the desired variance, returns a random variable in the range ( -variance, +variance )
 */
function random(variance) {
    return ((variance * 2) * Math.random() - variance);
}

function generateProductTree(row, column, name, description, price, image) {

    // ------------------------ set the element's position and rotation semi-randomly ----------------------------
    const entityElement = document.createElement('a-entity');
    const thisPositionX = startPositionX + (row * 12) + random(1);
    console.log('position', thisPositionX);
    const thisPositionZ = startPositionZ + (column * 12) + random(1);
    entityElement.object3D.position.set(thisPositionX, 0, thisPositionZ);//('position', position);
    entityElement.object3D.rotation.set(0, 2 + random(1), 0);

    //----------------------------- add tree object ---------------------------------------------------------------
    const treeElement = document.createElement('a-obj-model');
    treeElement.setAttribute('src', "#treeObject");
    treeElement.setAttribute('mtl', "#treeMaterial");
    treeElement.object3D.position.set(5, 0, -.2);
    treeElement.object3D.scale.set(0.01, 0.01, 0.01);
    treeElement.setAttribute('rotation', "0 180 0");
    treeElement.setAttribute('shadow', true);

    //----------------------------- add product name ---------------------------------------------------------------
    const productNameElement = document.createElement('a-text');
    productNameElement.setAttribute('value', name);
    productNameElement.object3D.position.set(1.455, 3.903, -0.625);
    productNameElement.setAttribute('rotation', "-1.714 -35.210 4.694");

    //----------------------------- add product description ---------------------------------------------------------
    const productDescriptionElement = document.createElement('a-text');
    productDescriptionElement.setAttribute('value', description);
    productDescriptionElement.object3D.position.set(0.891, 3.023, 0.305);
    productDescriptionElement.setAttribute('rotation', "-2.478 3.410 1.852");
    productDescriptionElement.setAttribute('width', "3.5");

    //----------------------------- add product price ---------------------------------------------------------------
    const productPriceElement = document.createElement('a-text');
    productPriceElement.setAttribute('value', price);
    productPriceElement.object3D.position.set(5.894, 2.212, 1.655);
    productPriceElement.setAttribute('rotation', "4.970 -35.630 -2.980");

    //----------------------------- add product plane object ---------------------------------------------------------
    const productPlaneElement = document.createElement('a-obj-model');
    productPlaneElement.setAttribute('src', "#productPlaneObject");
    productPlaneElement.object3D.position.set(4.554, 0.708, -0.200);
    productPlaneElement.object3D.scale.set(0.01, 0.01, 0.01);
    productPlaneElement.setAttribute('rotation', "0 175.2 0");
    productPlaneElement.setAttribute('shadow', true);
    const materialString = `src: ${image}; transparent: true;`;
    console.log("material string", materialString);
    productPlaneElement.setAttribute('material' , materialString);

    // ----------------------------- add add to cart button ------------------------------------------------------------
    const addToCartElement = document.createElement('a-obj-model');
    addToCartElement.setAttribute('src', "#buttonObject");
    addToCartElement.setAttribute('mtl', "#buttonMaterial");
    addToCartElement.object3D.position.set(5, 1.157, 1.909);
    addToCartElement.object3D.scale.set(0.01, 0.01, 0.01);
    addToCartElement.setAttribute('rotation', "0 0 0 ");
    addToCartElement.setAttribute('shadow', true);
    //TODO: on click add item to cart (cursor event)

    entityElement.appendChild(treeElement);
    entityElement.appendChild(productNameElement);
    entityElement.appendChild(productDescriptionElement);
    entityElement.appendChild(productPriceElement);
    entityElement.appendChild(productPlaneElement);
    entityElement.appendChild(addToCartElement);

    return entityElement;

}
const productList = {
    storeItems: [
        {
            name : 'First Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__black_wrinkle_front_mockup_f18e5ae7-b7a6-4bf2-99e6-c4747f4c17f3_1024x1024.png?v=1467231980',
            description: 'This is a good description of the product',
            price: '$100 ',
            productPageUrl: 'https://www.wix.com',
        },
        {
            name : 'Second Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__gold_wrinkle_front_mockup_1_19f1a76f-22d7-43e1-903f-a8387f5bd021_1024x1024.png?v=1476806229',
            description: 'This is a good description of the product 2',
            price: '$150 ',
            productPageUrl: 'https://www.amazon.com',
        },
        {
            name : 'Third Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/Stay-woke-white_mockup_Wrinkle-Front_Red_1024x1024.png?v=1506276950',
            description: 'This is a good description of the product 3',
            price: '$50 ',
            productPageUrl: 'https://www.facebook.com',
        },{
            name : 'First Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__black_wrinkle_front_mockup_f18e5ae7-b7a6-4bf2-99e6-c4747f4c17f3_1024x1024.png?v=1467231980',
            description: 'This is a good description of the product',
            price: '$100 ',
            productPageUrl: 'https://www.wix.com',
        },
        {
            name : 'Second Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__gold_wrinkle_front_mockup_1_19f1a76f-22d7-43e1-903f-a8387f5bd021_1024x1024.png?v=1476806229',
            description: 'This is a good description of the product 2',
            price: '$150 ',
            productPageUrl: 'https://www.amazon.com',
        },
        {
            name : 'Third Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/Stay-woke-white_mockup_Wrinkle-Front_Red_1024x1024.png?v=1506276950',
            description: 'This is a good description of the product 3',
            price: '$50 ',
            productPageUrl: 'https://www.facebook.com',
        },{
            name : 'First Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__black_wrinkle_front_mockup_f18e5ae7-b7a6-4bf2-99e6-c4747f4c17f3_1024x1024.png?v=1467231980',
            description: 'This is a good description of the product',
            price: '$100 ',
            productPageUrl: 'https://www.wix.com',
        },
        {
            name : 'Second Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__gold_wrinkle_front_mockup_1_19f1a76f-22d7-43e1-903f-a8387f5bd021_1024x1024.png?v=1476806229',
            description: 'This is a good description of the product 2',
            price: '$150 ',
            productPageUrl: 'https://www.amazon.com',
        },
        {
            name : 'Third Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/Stay-woke-white_mockup_Wrinkle-Front_Red_1024x1024.png?v=1506276950',
            description: 'This is a good description of the product 3',
            price: '$50 ',
            productPageUrl: 'https://www.facebook.com',
        },{
            name : 'First Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__black_wrinkle_front_mockup_f18e5ae7-b7a6-4bf2-99e6-c4747f4c17f3_1024x1024.png?v=1467231980',
            description: 'This is a good description of the product',
            price: '$100 ',
            productPageUrl: 'https://www.wix.com',
        },
        {
            name : 'Second Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/american_apparel__gold_wrinkle_front_mockup_1_19f1a76f-22d7-43e1-903f-a8387f5bd021_1024x1024.png?v=1476806229',
            description: 'This is a good description of the product 2',
            price: '$150 ',
            productPageUrl: 'https://www.amazon.com',
        },
        {
            name : 'Third Fabulous T-shirt',
            mainMedia: 'https://cdn.shopify.com/s/files/1/1103/0108/products/Stay-woke-white_mockup_Wrinkle-Front_Red_1024x1024.png?v=1506276950',
            description: 'This is a good description of the product 3',
            price: '$50 ',
            productPageUrl: 'https://www.facebook.com',
        },
    ]
};
