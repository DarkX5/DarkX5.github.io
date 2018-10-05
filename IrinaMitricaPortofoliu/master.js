// Royal Blue:  #2f9ec2 / rgba(47, 158, 194, 1);


var o = {
    ids: {
        mainMenu: "MainMenu",
        spacerMainMenu: "SpacerMainMenu",
        projects: "ProjectsContainer",
        spacerProjectsMenu: "SpacerProjectsMenu",
        paintings: "PaintingsContainer",
        animations: "AnimationsContainer",
        fx: "FXContainer",
        about: "AboutContainer",
        contact: "ContactContainer",
        overlay: { 
            container: "OverlayContainer",
            image: "oImage",
            video: "oVideo",
            name: "oName",
            type: "oType",
            status: "oStatus",
            price: "oPrice",
            height: "oHeight",
            width: "oWidth",
            description: "oDescription"
        }

    },
    class: {
        hide: "hide",
        btnSel: "btn-selected"
    },
    text: {
        sold: "SOLD",
        priceSold: "N/A"
    }
}

function windowResize() {
    var topMenus = $("#"+ o.ids.mainMenu).height()
    topMenus += $("#"+ o.ids.spacerMainMenu).height()
    topMenus += $("#"+ o.ids.projects).height()
    topMenus += $("#"+ o.ids.spacerProjectsMenu).height()
    var newHeight = window.innerHeight - topMenus - 30;
    var newHeightS = String(newHeight);
    $("#"+ o.ids.paintings).height(newHeight +"px");
    $("#"+ o.ids.animations).height(newHeight +"px");
    $("#"+ o.ids.fx).height(newHeight +"px");

    newHeight -= 40; //paintings container height
	newHeight *= 0.75; //leave 75% free for image info
    newHeightS = String(newHeight);
    $("#"+ o.ids.paintings +" .pimage").height(newHeight +"px");
}

function setInfo() {
    var imagebox = '', content = '';
    $("#"+ o.ids.paintings).empty();
    for(var i = 0; i < contentData.image.length; i += 1) {
        imagebox  = '<div class="pspacer"></div>';
        imagebox += '<div class="flex pcontainer icontainer-js" data-link="'+ contentData.image[i].source +'">';
        // imagebox += '<img class="pimage" src="./media/image/'+ contentData.image[i].source +'">';
        imagebox += '<a target="_blank" href="'+ contentData.image[i].link +'">';
        imagebox += '<img class="pimage" src="'+ contentData.image[i].source +'"/>';
        imagebox += '</a>';
        imagebox += '<div class="flex info tcontent img position">';
        imagebox += '<div class="flex trow name">';
        imagebox += '<div class="text">Name</div>';
        imagebox += '<div class="content">'+ contentData.image[i].name +'</div>';
        imagebox += '</div>';
        imagebox += '<div class="flex trow status">';
        imagebox += '<div class="text">Status</div>';
        imagebox += '<div class="content">'+ contentData.image[i].status +'</div>';
        imagebox += '</div>';
        imagebox += '<div class="flex trow price">';
        imagebox += '<div class="text">Price</div>';
        imagebox += '<div class="content">'+ contentData.image[i].price +'</div>';
        imagebox += '</div>';
        imagebox += '<div class="flex trow description">';
        imagebox += '<div class="text">Description</div>';
        imagebox += '<div class="content">'+ contentData.image[i].description +'</div>';
        imagebox += '</div></div></div>';
        $("#"+ o.ids.paintings)[0].innerHTML += imagebox;
    }

    $(".icontainer-js").on("click", function(a) {
        // window.open($(this).find(".pimage")[0].src);
    })
    
/*
    var imgContainers = $(".icontainer-js");
    var imgSrc, info;
    for(var i = 0; i < imgContainers.length; i += 1) {
        imgSrc = $($(imgContainers[i]).find(".pimage")[0]).attr("src");
        for(var j = 0; j < contentData.image.length; j += 1) {
            if(contentFolders.image + contentData.image[j].source == imgSrc) {
                info = $(imgContainers[i]).find(".info");
                $(info.find(".name").find(".content")).text(contentData.image[j].name);
                $(info.find(".status").find(".content")).text(contentData.image[j].status);
                if(contentData.image[j].status.toLowerCase() == o.text.sold.toLowerCase())
                    $(info.find(".price").find(".content")).text(o.text.priceSold);
                else
                    $(info.find(".price").find(".content")).text(contentData.image[j].price);
                $(info.find(".description").find(".content")).text(contentData.image[j].description);
            }
        }
    }
*/
}

$(".main-menu-js").on("click", function() {
    var link = $(this).data("link");
    $(".main-menu-js").removeClass(o.class.btnSel);
    $(this).addClass(o.class.btnSel);
    $(".container-js").addClass(o.class.hide);
    $("#"+ link).removeClass(o.class.hide);
    if(link !== o.ids.projects)
        $("#"+ o.ids.projects).addClass(o.class.hide);
    else {
        $("#"+ o.ids.projects).removeClass(o.class.hide);
        $(".submenu-js").removeClass(o.class.btnSel);
        $(".submenu-js[data-link='"+ o.ids.paintings +"'").addClass(o.class.btnSel);
        $("#"+ o.ids.paintings).removeClass(o.class.hide);
    }
})

$(".submenu-js").on("click", function() {
    var link = $(this).data("link");
    $(".submenu-js").removeClass(o.class.btnSel);
    $(this).addClass(o.class.btnSel);
    $(".container-js").addClass(o.class.hide);
    $("#"+ link).removeClass(o.class.hide);
})

//$(".icontainer-js").on("click", function() {
//    window.open($(this).find(".pimage")[0].src);
/*
    var imgSrc = "";
    if($(this).children()[1].className.indexOf("pimage") > -1)
        imgSrc = $($(this).children()[1]).attr("src");
    else
        imgSrc = $($(this).children()[0]).attr("src");

    window.open(imgSrc);

    $(".page-js").addClass(o.class.hide);
    $("#"+ o.ids.overlay.image).removeClass(o.class.hide);
    $("#"+ o.ids.overlay.video).addClass(o.class.hide);
    for(var i = 0; i < contentData.image.length; i += 1) {
        if(contentFolders.image + contentData.image[i].source == imgSrc) {
            $("#"+ o.ids.overlay.image +" img").attr("src", imgSrc);
            $("#"+ o.ids.overlay.name).text(contentData.image[i].name);
            // $("#"+ o.ids.overlay.type).text(contentData.image[i].type);
            $("#"+ o.ids.overlay.status).text(contentData.image[i].status);
            if(contentData.image[i].status.toLowerCase() == o.text.sold.toLowerCase())
                $("#"+ o.ids.overlay.price).text(o.text.priceSold);
            else
                $("#"+ o.ids.overlay.price).text(contentData.image[i].price);
            // $("#"+ o.ids.overlay.height).text(contentData.image[i].height);
            // $("#"+ o.ids.overlay.width).text(contentData.image[i].width);
            $("#"+ o.ids.overlay.description).text(contentData.image[i].description);
        }
    }
    $("#"+ o.ids.overlay.container).removeClass(o.class.hide);
*/
//})

$(".vcontainer-js").on("click", function() {
    var imgSrc = "";
    if($(this).children()[1].className.indexOf("pimage") > -1)
        imgSrc = $($(this).children()[1]).attr("src");
    else
        imgSrc = $($(this).children()[0]).attr("src");

    $(".page-js").addClass(o.class.hide);
    $("#"+ o.ids.overlay.image).addClass(o.class.hide);
    $("#"+ o.ids.overlay.video).removeClass(o.class.hide);
    $("#"+ o.ids.overlay.container +" .type").addClass(o.class.hide);
    $("#"+ o.ids.overlay.container +" .dimension").addClass(o.class.hide);
    for(var i = 0; i < contentData.video.length; i += 1) {
        if(contentFolders.video + contentData.video[i].sourcecover == imgSrc) {
            $("#"+ o.ids.overlay.video +" .video").attr("src", contentData.video[i].sourcevideo);
            $("#"+ o.ids.overlay.name).text(contentData.video[i].name);
            $("#"+ o.ids.overlay.status).text(contentData.video[i].status);
            $("#"+ o.ids.overlay.description).text(contentData.video[i].description);
        }
    }
    $("#"+ o.ids.overlay.container).removeClass(o.class.hide);
})

$("#"+ o.ids.overlay.container).on("click", function() {
    $("#"+ o.ids.overlay.container).addClass(o.class.hide);
    $(".page-js").removeClass(o.class.hide);
})
