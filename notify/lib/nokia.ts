import { NokiaData } from "../types";

export default class Nokia {
  
  static genQueryString(params:any):string {
    let query_string:string='';
    for(let param in params) {
      if(['action', 'user_id', 'callbackurl', 'comment', 'appli', 'start', 'end', 'type', 'userid', 'date'].filter((nonOauthParam)=>param.includes(nonOauthParam)).length) query_string+=param+'='+params[param]+'&';
      else query_string+='oauth_'+param+'='+params[param]+'&';
    }
    return query_string.substring(0, query_string.length-1);
  }

  static translate(data:NokiaData):NokiaData {
    for(let key of Object.keys(data)) {
      if(data[key]!=null&&typeof data[key]==='object') this.translate(data[key]);
      if(key=='type') {
        data[key]={
          1:'Weight (kg)',
          4:'Height (meters)',
          9:'Diastolic Blood Pressure (mmHg)',
          10:'Systolic Blood Pressure (mmHg)',
          11:'Heart Pulse (bpm)'
        }[data[key]]||data[key];
      } else if(key=='category') {
        data[key]={
          1:'Real measurement',
          2:'User objective'
        }[data[key]]||data[key];
      } else if(key=='attrib') {
        data[key]={
          0:'The measuregroup has been captured by a device and is known to belong to this user \(and is not ambiguous\)',
          1:'The measuregroup has been captured by a device but may belong to other users as well as this one (it is ambiguous)',
          2:'The measuregroup has been entered manually for this particular user',
          4:'The measuregroup has been entered manually during user creation (and may not be accurate)',
          5:'Measure auto, it\'s only for the Blood Pressure Monitor. This device can make many measures and computed the best value',
          7:'Measure confirmed. You can get this value if the user confirmed a detected activity'
        }[data[key]]||data[key];
      } else if(key=='unit') {
        data['power_of_ten_multiplier'] = data[key];
        delete data[key];
      }
    };
    return data;
  }

}