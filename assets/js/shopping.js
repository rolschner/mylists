//Document ready, load <li> list
$(function() {
	// Document is ready!
    console.log( "ready!" );
	let listItems = JSON.parse(localStorage.getItem("shoppingList"));
	if(listItems.length === 0) {
		// Create a defeault list of items for a new page
		listItems.push("Apples");
		listItems.push("Bananas");
		listItems.push("Bread");
	}
	for (let i=0; i<listItems.length; i++){
		$("ul").append("<li><span><i class='fas fa-minus-circle'></i></span> " + listItems[i] + "</li>");
	}
});

//Check off specific items by clicking
$("ul").on("click", "li", function(e){
	$(this).toggleClass("completed");
	e.stopPropagation();
});

// Delete item 
$("ul").on("click", "li span", function(e){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	e.stopPropagation();
});

$("input[type='text']").keypress(function(e){
	if(e.which === 13) {
		const newItem = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-minus-circle'></i></span> " + newItem + "</li>");
	}
});

$(".fa-cart-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

$(".fa-save").click(function(){
	saveList();
});

function saveList() {
	console.log("save");
	localStorage.clear();
	let listItems = [];
	$("ul li").each(function( index ) {
		listItems.push($(this).text());
	});
	localStorage.setItem("shoppingList", JSON.stringify(listItems));	
};

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
	// We can use localStorage
	console.log("storage avail");
}
else {
	// Too bad, no localStorage for us
}

