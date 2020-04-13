
function addProduct() {

    //  let fullProduct = [category, product, extra];
    let product = $('#orderProduct option:selected').text();
    let extra = $('#orderExtra option:selected').text();
    let index = prodCounter; //Começa no 0

    $("#newProduct").append(`<tr id="idRow${index}">
            <td><button type="button" onclick="deleteRow(${index})" id="deleteButton${index}" class="btn btn-danger btn-sm">Del</button></td>
            <td>${product}</td>
            <td>${extra}</td>
            </tr>`);

    // $("#deleteHeader").append(`<tr><td><button onclick ="deleteRow()" id="deleteButton" type="button" class="btn btn-primary btn-sm">Small button</button></tr>`);

    prod = new Product(product, extra);

    console.log(prod);

    //prodList.push(prod);

    prodList.addProductToArray(prod);

    prodCounter++;

    console.log(prodList);

}

function addOrder() {

    prodCounter = 0;
    name = $("#clientName").val();
    prodList.name = name;

// Certifica-se que tem nome e produtos

    if (prodList.name == 0) {
        alert("Por Favor Insira o Seu Nome   =)  ");
    } else {

        if (prodList.products.length == 0) {
            alert("Por Favor Insira Algum Produto   =)  ");
        }
        else {

            activeOrder.push(prodList);

            filterKitchen(prodList);
            updateKitchenButtons();

            prodList = new Order(); // Este prodList é no fundo a order actual, o nome ]e um pouco infeliz, mudar
            $("#newProduct").html(``);

            console.log(prodList);
            console.log(activeOrder);

            // dá um trigger ao change do id filterOrderStatus e corre a funcao que está no html como $("#orderCategory").change(function(){...})

            $("#filterOrderStatus").trigger("change");
        }
    }
}


function updateKitchen(type) {

    $("#kitchenDiv").empty(); //Limpa o que lá está (semelhante ao .html(``))
    let obj = [];
    let product = [];
    let extra = [];

    switch (type) {

        case "all":
            if (activeOrder.length > 0) {
                obj = activeOrder[0];
                for (i = 0; i < obj.products.length; i++) {

                    product.push(obj.products[i].product)
                    extra.push(obj.products[i].extra);
                    nome = obj.name;
                    id = obj.id;
                }
            }

            break;

        case "extra":
            if (activeOrderExtra.length > 0) {
                obj = activeOrderExtra[0];
                for (i = 0; i < obj.products.length; i++) {

                    product.push(obj.products[i].product)
                    extra.push(obj.products[i].extra);
                    nome = obj.name;
                    id = obj.id;
                }
            }

            break;

        case "normal":
            if (activeOrderNormal.length > 0) {
                obj = activeOrderNormal[0];
                for (i = 0; i < obj.products.length; i++) {

                    product.push(obj.products[i].product)
                    extra.push(obj.products[i].extra);
                    nome = obj.name;
                    id = obj.id;
                }
            }
            break;
    }

    typeRetentive = type;

    if (activeOrder.length == 0) {

        $("#kitchenBody").html(``);

    } else {

        $("#kitchenDiv").html(`
            <div class="row col-12">
                <b id="orderId">Id do Pedido :  ${id}</b>
            </div>
            <p></p>
            <div class="row col-12">
                <b id="orderName">Nome do Cliente : ${nome}</b>
            </div>
            <p></p>
            <div class="row col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Artigo</th>
                            <th scope="col">Extra</th>
                        </tr>
                    </thead>
                    <tbody id="kitchenBody">
                    </tbody>
                </table>
            </div>`)

        $("#kitchenBody").html(``);

    }

    for (i in product) {
        if (activeOrder.length == 0) {
            $("#kitchenBody").append(`
                        <tr>
                        <td>No Order</td>
                        <td>No Order</td>
                        </tr>`)
        } else {
            $("#kitchenBody").append(`
                        <tr>
                        <td>${product[i]}</td>
                        <td>${extra[j]}</td>
                        </tr>`)
        }
    }
}

function updateOrderStatus() {

    let filterOrder = $("#filterOrderStatus option:selected").text();

    // $("#tbodyOrderStatus").html(``);

    arrayAux = [];

    switch (filterOrder) {

        case 'all':
            arrayAux = activeOrder;
            break;
        case 'extra':
            arrayAux = activeOrderExtra;
            break;
        case 'normal':
            arrayAux = activeOrderNormal;
            debugger
            break;

    }

    for (i in arrayAux) {
        for (j in arrayAux[i].products) {
            $("#tbodyOrderStatus").append(`
                        <tr>
                            <td>${arrayAux[i].products[j].product}</td>
                            <td>${arrayAux[i].products[j].product}</td>
                        </tr>`);
        }
    }
}

function deleteRow(nrProduct) {
    prodList.products.splice(nrProduct, 1);
    $("#newProduct").html(``);
    for (index in prodList.products) {
        let product = prodList.products[index].product;
        let extra = prodList.products[index].extra;

        $("#newProduct").append(`<tr id="idRow${index}">
            <td><button type="button" onclick="deleteRow(${index})" id="deleteButton${index}" class="btn btn-danger btn-sm">Del</button></td>
            <td>${product}</td>
            <td>${extra}</td>
            </tr>`);

    }
}

function filterKitchen(order) {

    let flagComExtra = false;

    for (j in order.products) {

        if (order.products[j].extra != "None") {
            // Encontra o index do order que tem extras e dá push a essa order logo
            flagComExtra = true;
            break;
        }
    }

    if (flagComExtra == true) {
        activeOrderExtra.push(order);
    }
    else {
        activeOrderNormal.push(order);
    }

}

function updateKitchenButtons() {

    let button_all = activeOrder.length;
    let button_extra = activeOrderExtra.length;
    let button_normal = activeOrderNormal.length;

    $("#allButton").html(` Todos (${button_all})`);
    $("#extraButton").html(` Com Extra (${button_extra})`);
    $("#normalButton").html(`Sem Extra (${button_normal})`);

}

function orderReady() {

    if (activeOrder.length > 0) {
        switch (typeRetentive) {
            case 'all':

//Este filtro tem algum bug, não está a fazer o shift do activeOrderNormal quando devia

                let orderKitchen = activeOrder;
                let flagComExtra = false;

                for (j in orderKitchen[0].products) {

                    if (orderKitchen[0].products[j].extra != "None") {
                       
                        flagComExtra = true;
                        break;
                    }
                }

                if (flagComExtra == true) {
                    activeOrderExtra.shift();
                }
                else {
                    activeOrderNormal.shift();
                }

                activeOrder.shift();

                break;

            case 'extra':

                if (activeOrderExtra.length > 0) {

                    for (i in activeOrder) {
                        if (activeOrder[i].id == activeOrderExtra[0].id) {
                            activeOrder.splice(i, 1);
                        }
                    }
                    activeOrderExtra.shift();
                }
                break;

            case 'normal':

                if (activeOrderNormal.length > 0) {

                    for (i in activeOrder) {
                        if (activeOrder[i].id == activeOrderNormal[0].id) {
                            activeOrder.splice(i, 1);
                        }
                    }
                    activeOrderNormal.shift();
                }
                break;
        }
    }
    updateKitchenButtons();
    updateKitchen(typeRetentive);

}