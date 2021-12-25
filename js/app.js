
// ********************** TODOs **************************
//
// [*] get ip address
// [*] split the ip subnetmask from address
// [*] validate the ip address
// [*] get IP class
// [] validate the subnetmask
// [] construct the subnetmask
// [] AND the mask to find network and host portions
// [] count the subnet and host bits
// [] get the network and the broadcast address of each subnet
// [] print the results
// 
// 

import IPClass from './IPClass';

const form = document.querySelector("form");
const ipAddressTextField = document.getElementById('ip-address-tf');
form.onsubmit = () => {
    // alert(ipAddressTextField.value);
    let input = ipAddressTextField.value;

    if (!input.trim().length > 0) return;//show error and ruturn
    let ipAddress = input.split('.');
    if (ipAddress.length !== 4) return;// invalid ip address

    // get the subnetmask from ipAddress' last octect and convert it to into integer
    let subnetMask = parseInt(ipAddress[3].split('/')[1]);

    // convert to integer and validate ip IP Address
    ipAddress[3] = ipAddress[3].split('/')[0];
    ipAddress.forEach((value, index, array) => {
        array[index] = parseInt(value);
    });

    if (!(ipAddress.every(element => isInRange(element, 0, 255)))) {
        // log error
        return;
    }

    // get IP class
    const IPv4Class = getIpv4Class();

    // if subnet is valid go ahead and contract the full address
    // create subnet from slash-notation
    // const fullSubnetMask = getSubnetMask(subnetMask);

    //


}

/**
 * check the if a number is in range
 * @param {Integer} number - current number 
 * @param {Integer} min - lowest value
 * @param {Integer} max - highest value
 * @returns true if the is between min and max
 */
const isInRange = (number, min, max) => (number >= min && number <= max);
const getIpv4Class = (firstOctect) => {
    let ipClass;
    switch (firstOctect) {
        case firstOctect > -1 && firstOctect <= 126:
            ipClass = IPClass.A;
            break;
        case firstOctect >= 128 && firstOctect <= 191:
            ipClass = IPClass.B;
            break;
        case firstOctect >= 192 && firstOctect <= 223:
            ipClass = IPClass.C;
            break;
        case firstOctect >= 224 && firstOctect <= 239:
            ipClass = IPClass.D;
            break;
        case firstOctect >= 240 && firstOctect <= 255:
            ipClass = IPClass.E;
            break;
        default:
    }
    return ipClass;
}

const isSubnetValid = (ipClass, slash) => {
    if (ipClass == IPClass.A && slash < 8 ||
        ipClass == IPClass.B && slash < 16 ||
        ipClass == IPClass.C && slash < 24 ||
        ipClass == IPClass.D && slash < 27 ||
        ipClass == IPClass.E && slash < 28) {
        return false;
    }
    return true;
}

const getFullSubnetMask = (subnetMask) => {
    // 
}

export { isInRange, getIpv4Class };