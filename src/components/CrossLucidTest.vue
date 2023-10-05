<script>

let location;
let device;
let artworksViewed;
let sessionLength;
let aboutTextViewed;
let clicks;
let textViewed;
let currentVisitors;
let platformVersionNumberTotal;
let volume;
let charge;
let windowRatio;
let lastKeyPressed;

if(location == RU){
	// PLAY UKRAINE VICTORY SIGIL
}else if(location == US){
	// PLAY SCENE 4
}else{
	selectScene;
}

function selectScene(){

    if(aboutTextViewed && sessionLength > 10){
        // PLAY SCENE 1
    }else if(clicks > 20 && clicks < 50 && artworksViewed < 5){
        // PLAY SCENE 2
    }else if(artworksViewed > 10 && aboutTextViewed){
        // PLAY SCENE 3
    }else if(currentVisitors > 100 && device == 'desktop'){
        // PLAY SCENE 4
    }else if(platformVersionNumberTotal == 7 || platformVersionNumberTotal == 11 && device == 'mobile'){
        // PLAY SCENE 5
    }else if(volume > 80 && charge < 20){
        // PLAY SCENE 6
    }else if(windowRatio < .5 || windowRatio < 1.5 && lastKeyPressed == 'x'){
        // PLAY SCENE 7
    }else{
        // what if none of these conditions are met?
    }

}

</script>