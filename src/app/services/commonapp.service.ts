import {Injectable} from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../services/static-variable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonAppService {
	headers : Headers;
	constructor(public http: Http){
		console.log(' CommonService call');
	}

	mergeObjects(obj1: any, obj2: any, callback: any){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    callback(obj3);
	}

	getFormattedAddress(place: any){
	    let street_number = "",
	        name = "",
	        address = "",
	        city = "",
	        state = "",
	        zip = "",
	        country = "",
	        formattedAddress = "";

	    for (let i = 0; i < place.address_components.length; i++) {
	        let addr = place.address_components[i];
	        if (addr.types[0] == 'street_number')
	            street_number = addr.short_name;
	        else if (addr.types[0] == 'country')
	            country = addr.long_name;
	        else if (addr.types[0] == 'street_address') // address 1
	            address = address + addr.long_name;
	        else if (addr.types[0] == 'establishment')
	            address = address + addr.long_name;
	        else if (addr.types[0] == 'route')  // address 2
	            address = address + addr.long_name;
	        else if (addr.types[0] == 'postal_code')       // Zip
	            zip = addr.short_name;
	        else if (addr.types[0] == ['administrative_area_level_1'])       // State
	            state = addr.short_name;
	        else if (addr.types[0] == ['locality'])       // City
	            city = addr.long_name;
	    }

	    if (place.name && place.name != "") {
	        name = place.name + ", ";
	    } else if (street_number != "") {
	        name = street_number + ", ";
	    }
	    
	    formattedAddress = name + address + ", " + city + ", " + state;
	    let array = formattedAddress.split(',');
	    let newArray = array.filter(function(v){return v!==''});
	    if(address == '' && city == ''){
	        return "";
	    }
	    return formattedAddress;
	}

	getFormattedDate(date: any){
		let dt= new Date(date);
	   	return (dt.getFullYear() + '-' + ('0' + (dt.getMonth()+1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2));
	}

    getDayDiffFromTwoDate(firstDate: any, secondDate: any) {
        let dayDiff = (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
        return dayDiff;
    }

	sendEmail(emailUser: any) {
        let body = JSON.stringify(emailUser);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.SEND_EMAIL, body, options)
            .map((data: any) => {
                data.json();
                return data.json();
            }); 
    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    calDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
      	let R = 6371; // km
      	let dLat = this.toRad(lat2-lat1);
      	let dLon = this.toRad(lon2-lon1);
      	let radlat1 = this.toRad(lat1);
      	let radlat2 = this.toRad(lat2);

      	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(radlat1) * Math.cos(radlat2); 
      	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      	let d = R * c;
      	return d;
    }

    // Converts numeric degrees to radians
    toRad(Value: any) {
        return Value * Math.PI / 180;
    }

    isUndefined(obj: any){
    	if(typeof obj == 'undefined' || obj == null || obj == ''){
    		return true;
    	} else {
    		return false;
    	}
    }

    getSelectedFromMultiselect(object: any){
    	let array: string[] = [];

    	for (let key in object) {
           console.log(' object ' + JSON.stringify(object[key]));
           if(object[key].checked && object[key].checked == true){
           		array.push(object[key].value);
           }
        }

        return array;
    }

    getArrayFromString(object: string){
        let array: string[] = [];

        // let items = object.slice(1, -1).split(',');
        // console.log(' rentalItem.items ' + JSON.stringify(items));
        // for (let k in items){
        //     console.log(' items[k] ' + JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
        //     array.push(JSON.stringify(items[k]).replace(/['"]+/g, '').slice(1, -1));
        // }

        return array;
    }

}