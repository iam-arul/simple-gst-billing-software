export const getGstPrice = (gstPercentage, amount) => {
    // Define the final amount and GST rate as a percentage
    const finalAmount = amount;
    const gstRatePercentage = gstPercentage;

    // Convert the GST rate from percentage to decimal
    const gstRate = gstRatePercentage / 100;

    // Calculate the product price before GST
    let productPriceBeforeGST = finalAmount / (1 + gstRate);

    // Round off the product price before GST to 2 decimal places
    productPriceBeforeGST = parseFloat(productPriceBeforeGST.toFixed(2));

    // Calculate the GST amount
    let gstAmount = productPriceBeforeGST * gstRate;

    // Round off the GST amount to 2 decimal places
    gstAmount = parseFloat(gstAmount.toFixed(2));

    // Calculate the final price
    let finalPrice = productPriceBeforeGST + gstAmount;

    // Calculate the difference between the final amount and the actual final price
    const difference = finalAmount - finalPrice;

    // If the difference is positive, increase the product price before GST
    if (difference > 0) {
        productPriceBeforeGST += difference / (1 + gstRate);
        finalPrice = productPriceBeforeGST + gstAmount;
    }

    // If the difference is negative, decrease the product price before GST
    if (difference < 0) {
        productPriceBeforeGST -= Math.abs(difference) / (1 + gstRate);
        finalPrice = productPriceBeforeGST + gstAmount;
    }

    // Round off the final price to 2 decimal places
    finalPrice = parseFloat(finalPrice.toFixed(2));

    return {
        gstAmount,
        finalPrice : productPriceBeforeGST
    }

}

export  const getPrice = (gstPercentage, amount) => { 
    let gstAmount = (amount * gstPercentage) / 100;
    let finalPrice = amount + gstAmount;
    gstAmount = parseFloat(gstAmount.toFixed(2));
    finalPrice = parseFloat(finalPrice.toFixed(2));
    return {
        gstAmount,
        finalPrice
    }
}



export const generateDraftTableData = (formValues) => {
    console.log({ formValues })
    let items = formValues["items"];
    let hasIgst = formValues["hasIgst"];
    let isGst = formValues["isGst"];
    let sgst = Number(formValues["sgst"]);
    let cgst = Number(formValues["cgst"]);
    let igst = Number(formValues["igst"]);
    let emptyProduct = [createData("", "", "", "")];
    let total = 0;
    let gstPrice = {};
    let gstPercentage = hasIgst ? igst : (cgst + sgst);
    if (!items) return emptyProduct;

    const data = items.map((item) => {
        if (isGst) {
            gstPrice = getGstPrice(gstPercentage, Number(item.price));
        }
        else {
            gstPrice = getPrice(gstPercentage, Number(item.price));
        }

        let quantity = currencyFormatter.format(item.quantity || 0);
        let rate = makeMoney(Number(item.price) || 0);
        let total = getTotal(item.quantity || 0, gstPrice.finalPrice  || 0);
        return createData(item.productName, quantity, rate, makeMoney(total));
    });

    return data || emptyProduct;
}

function getTotal(quantity, price) {
    return parseFloat(quantity) * parseFloat(price);
}

export function createGstData(
    sGst,
    cGst,
    Igst,
) {
    return { sGst, cGst, Igst };
}
export function createData(
    name,
    quantity,
    rate,
    total,
) {
    return { name, quantity, rate, total };
}

export const currencyFormatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });


export function makeMoney(n) {
    let num = n.toString().replace(/\$|,/g, '');
    if (isNaN(num))
        num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    let paisa = num % 100;
    num = Math.floor(num / 100).toString();
    if (paisa < 10)
        paisa = "0" + paisa;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '₹' + num + '.' + paisa);

}   