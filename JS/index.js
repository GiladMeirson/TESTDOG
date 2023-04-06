
const DOG={};
function init() {

    ref = firebase.database().ref("DogTag");
    listenToNewMessages();


    $("#CoverPhoto").click(function() {
        $("input[id='CoverPhotoIN']").click();
    });


    $("#profilePhoto").click(function() {
        $("input[id='profilePhotoIN']").click();
    });
}


var loadFile=function(event){
    console.log(event);
    if (event.srcElement.id=='profilePhotoIN') {
        var output=document.getElementById('profilePhoto');

    } else {
        var output=document.getElementById('CoverPhoto');

    }
    output.src=URL.createObjectURL(event.target.files[0]);
    console.log(output.src);
    encodeImageFileAsURL(event.srcElement)
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      if (element.id=='profilePhotoIN') {
        DOG.ProfilePhotoBase64=reader.result;

      }
      else{
        DOG.CoverPhotoBase64=reader.result;

      }
    }
    reader.readAsDataURL(file);
}


function SubmitProfile() {

    const Petname=document.getElementById('namePetIN').value;
    const PetAge=document.getElementById('agePetIN').value;
    const IsKalevet=document.getElementById('kalevet').checked;
    const IsMeshushe=document.getElementById('meshushe').checked;
    const IsTolatpark=document.getElementById('tolatpark').checked;
    const IsSiros=document.getElementById('siros').checked;
    const OwnerName=document.getElementById('nameOwnerIN').value;
    const OwnerTel=document.getElementById('telOwnerIN').value;
    const Ownermail=document.getElementById('mailOwnerIN').value;
    const ProfileId='TEST';
    if (Petname!='' && PetAge!=0 && OwnerName!='' && OwnerTel!='' && Ownermail!='') {
        if (DOG.CoverPhotoBase64!=undefined && DOG.ProfilePhotoBase64!=undefined) {
            //ok
            DOG.Petname=Petname;
            DOG.PetAge=PetAge;
            DOG.IsKalevet=IsKalevet;
            DOG.IsMeshushe=IsMeshushe;
            DOG.IsTolatpark=IsTolatpark;
            DOG.IsSiros=IsSiros;
            DOG.OwnerName=OwnerName;
            DOG.OwnerTel=OwnerTel;
            DOG.Ownermail=Ownermail;
            DOG.ProfileId=ProfileId;
            console.log(DOG)
            ref.push().set(DOG);
            swal('success!','your Profile will be ready in a min..','success');
            DisplayProfile(true);


        }
        else{
            swal("error!", "please, upload your pet image\nrequire to create a profile.", "error");

        }

    }
    else{
        swal("Empty Values!", "Empty Values is not allowed", "error");
    }








}




function listenToNewMessages() {
    // child_added will be evoked for every child that was added
    // on the first entry, it will bring all the childs
  
    ref.on("child_added", (snapshot) => {
      const Piecse = snapshot.val();
      console.log(Piecse);
      if (Piecse.ProfileId='TEST') {
        RenderProfile(Piecse);
        DisplayProfile(false);
      }

    });
}

function RenderProfile(object) {
    const PH = document.getElementById('ProDogWrap');
    document.getElementById('profilePhoto').src=object.ProfilePhotoBase64;
    document.getElementById('CoverPhoto').src=object.CoverPhotoBase64;

    let str=`<p id="Maintitle">! מצאת כלב אבוד</p>`;
    str+=`<div id="Wrap3">`;
    str+=`<div id="DogContent">`;
    str+=`<p>${object.Petname}</p>`;
    str+=`<p>בת ${object.PetAge}</p>`;
    str+=`<div id="CheckDiv">`;
    if (object.IsKalevet) {
        str+=`<p>מחוסנת מכלבת</p>`;
        str+=`<img src="../images/check-mark.png" alt="">`;
    } else {
        str+=`<p>לא מחוסנת מכלבת</p>`;
    }

    str+=`</div>`;
    str+=`</div>`;
    str+=`<div id="OwnerContent">`;
    str+=`<p>בעלים: ${object.OwnerName}</p>`;
    str+=`<p>מס טלפון</p>`;
    str+=`<p>${object.OwnerTel}</p>`;
    str+=`</div>`;
    str+=`</div>`;
    str+=`<div id="BtnWrapSend">`;
    str+=`<button>!שלח איתות</button>`;
    str+=`</div>`;
    PH.innerHTML=str;


    // <p id="Maintitle">! מצאת כלב אבוד</p>
    // <div id="Wrap3">
    //     <div id="DogContent">
    //         <p>אייבי</p>
    //         <p>בת 6</p>
    //         <div id="CheckDiv">
    //             <p>מחוסנת מכלבת</p>
    //             <img src="../images/check-mark.png" alt="">
    //         </div>
            
    //     </div>
    //     <div id="OwnerContent">
    //         <p>בעלים: שיר וגלעד</p>
    //         <p>מס טלפון</p>
    //         <p>051-1111111</p>


    //     </div>
    // </div>
    // <div id="BtnWrapSend">
    //     <button>!שלח איתות</button>
    // </div>


}

function DisplayProfile(flag) {
    if (flag) {
        $('#FormContainer').fadeOut(1000);
        $('#BtnWrap').fadeOut(1000);
    }
    else{
        $('#FormContainer').fadeOut(1);
        $('#BtnWrap').fadeOut(1);
        // document.getElementById('FormContainer').style.display='none';
        // document.getElementById('BtnWrap').style.display='none';

    }
    $('#DogProfile').fadeIn(1000);
}