let model;
let class_indices;
let fileUpload = document.getElementById('uploadImage')
let img = document.getElementById('image')
let boxResult = document.querySelector('.box-result')
let Global;


let progressBar = 
    new ProgressBar.Circle('#progress', {
    color: 'limegreen',
    strokeWidth: 10,
    duration: 2000, // milliseconds
    easing: 'easeInOut'
});

async function fetchData(){
    let response = await fetch('./class_indices.json');
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

 // here the data will be return.


// Initialize/Load model
async function initialize() {
    let status = document.querySelector('.init_status')
    status.innerHTML = 'Cargando modelo .... <span class="fa fa-spinner fa-spin"></span>'
    console.log("ME")   
    model = await tf.loadLayersModel('./tensorflowjs-model/model.json');
    console.log("CAGO")
   
    status.innerHTML = 'Modelo cargado exitosamente  <span class="fa fa-check"></span>'
    
}

async function Download() { 
    //Creating a download for the image with the clasification
    let img = document.getElementById('image')
    let imgPath = image.getAttribute('src')
    fetchData().then((data)=> 
        {
        imgName = tf.argMax(prediction)
        }
    );
    saveAs(imgPath, imgName)
}


async function predict() {
    // Function for invoking prediction
    let img = document.getElementById('image')
    let offset = tf.scalar(255)
    let tensorImg =   tf.browser.fromPixels(img).resizeNearestNeighbor([224,224]).toFloat().expandDims();
    let tensorImg_scaled = tensorImg.div(offset)
    prediction = await model.predict(tensorImg_scaled).data();

    await fetchData().then((data)=> 
        {
            predicted_class = tf.argMax(prediction)

            class_idx = Array.from(predicted_class.dataSync())[0]
            document.querySelector('.pred_class').innerHTML = Object.keys(data)[class_idx]
            document.querySelector('.inner').innerHTML = `${parseFloat(prediction[class_idx]*100).toFixed(2)}% SURE`
            console.log(data)
            console.log(class_idx)
            console.log(Object.keys(data)[class_idx])
            console.log(prediction)

            progressBar.animate(prediction[class_idx]-0.005); // percent

        }
    );

    return document.querySelector('.pred_class').innerHTML;
}



fileUpload.addEventListener('change', function(e){

    let file = this.files[0]
    if (file){
        boxResult.style.display = 'block'
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function(){
        
            img.setAttribute('src', this.result);
        });
        console.log(file);
        reader.onloadend = function(){
            Global = reader.result
            console.log(Global);
        }
    }

    else{
    img.setAttribute("src", "");
    }

    initialize().then( () => {
        predict().then((Name)=>{
            var DownloadLink = document.getElementById("DownloadLink")
            DownloadLink.href = Global
            DownloadLink.download = Name
        });
        //file.Name = Name + ".jpg"
       
    }).catch(err => {
        console.log(err)
    })
})