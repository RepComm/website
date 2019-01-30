
const MKEventsAPI = {};
MKEventsAPI.fetch = (options, callback)=> {
    let domain = "http://" + window.location.host + "/res/php";
    domain = "http://jonathancrowder.com/res/php";
    let args = "";
    
    let keys = Object.keys(options);
    let key;
    for (let i=0; i<keys.length; i++) {
        key = keys[i];
        if (i==0) {
            args += "?";
        } else {
            args += "&";
        }
        args += key + "=" + options[key];
    }

    let url = domain + "/mk/api.php" + args;

    console.log("Url we fetch from", url);
    fetch(url)
        .then((r)=>r.json()
        .then((json)=>{
            callback(json);
        }));
}

//DEBUG
// MKEventsAPI.fetch({
//     offset:0,
//     limit:2
// }, (data)=>{
//     console.log(data);
// });