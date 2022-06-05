Webcam.set({
    height: 300,
    width: 300,
    image_format: "png",
    png_quality: 90
});

WebcamView = document.getElementById("WebcamView");
Webcam.attach("#WebcamView");

function CapImg(){
    Webcam.snap(function(data_uri){
        document.getElementById("SnapshotView").innerHTML = "<img src ="+ data_uri + " id = 'SnapImg' >";
    });
}

console.log("ml5 version is ", ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tZuX0HtGb/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model has been initialized");
}

function speak(){
    var speech = window.speechSynthesis;
    sd1 = "The Predicted Gesture is " + Prediction;
    Utterthis = new SpeechSynthesisUtterance(sd1);
    speech.speak(Utterthis);

}

function PredictEmotion(){
    img = document.getElementById("SnapImg");
    Classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);

        Prediction = results[0].label;
        speak()

        if(results[0].label == "Thumbs up"){
            document.getElementById("emoji_img").innerHTML = "👍";
            document.getElementById("emoji_name").innerHTML = "Predicted Gesture is Thumbs Up"
        }else if(results[0].label == "Thumbs down"){
            document.getElementById("emoji_one_img").innerHTML = "👎";
            document.getElementById("emoji_name").innerHTML = "Predicted Gesture is Thumbs Down"
        }else if(results[0].label == "Okay"){
            document.getElementById("emoji_img").innerHTML = "👌";
            document.getElementById("emoji_name").innerHTML = "Predicted Gesture is Okay"
        }else if(results[0].label == "Gun"){
            document.getElementById("emoji_img").innerHTML = "🔫";
            document.getElementById("emoji_name").innerHTML = "Predicted Gesture is Gun"
        }else if(results[0].label == "High five"){
            document.getElementById("emoji_img").innerHTML = "🖐️";
            document.getElementById("emoji_name").innerHTML = "Predicted Gesture is High Five"
    }
}
}