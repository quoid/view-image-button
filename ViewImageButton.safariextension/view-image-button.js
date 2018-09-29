function addButton(el) {
    var img_src = el.getAttribute("src");
    
    var container = el.closest(".irc_c");
    var buttons = container.querySelector(".irc_but_r tr");
    
    var view_button = buttons.querySelector(".gisvi");
    
    if (view_button === null) {
        console.info("view image button not created, making one");
        var clone_button = buttons.querySelector("td");
        view_button = clone_button.cloneNode(true);
        view_button.classList.add("gisvi");
        view_button.querySelector("a span:nth-child(2)").innerText = "View Image";
        view_button.querySelector("a span:nth-child(1)").className = "";
        view_button.querySelector("a span:nth-child(1)").innerHTML = "";
        
        var link = view_button.querySelector("a");
        link.href = img_src;
        link.className = "";
        link.removeAttribute("data-cthref");
        link.removeAttribute("jsaction");
        
        buttons.appendChild(view_button);
    }
    
    var link = view_button.querySelector("a");
    link.href = img_src;
}

function check_page() {
    var p = document.querySelector(".hdtb-msel"); //google search tab selector
    
    if (p != null && p.innerText === "Images") { //if tab selector exists and 'Images' selected
        console.info("google images search detected - enabling 'view image' buttons");
        
        var targetNode = document.getElementById("gsr");

        var config = { childList: true, subtree: true };
        
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                var nodes = mutation.addedNodes;
                nodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("irc_mi")) {
                        addButton(node);
                    }
                });
            }
        };
        
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
}

check_page();