// menu creation
NS=(document.layers) ? true : false;
IE=(document.all) ? true : false;
IE50=(navigator.appVersion.indexOf("MSIE 5.0")!=-1?true:false);
function popUp(){return};
function popDown(){return};
areCreated=false;
mSecsVis = secondsVisible*1000;
// layers settings
semi = ";";
styleStr = "<STYLE TYPE='text/css'>"
styleStr += ".items {"
styleStr += "width:" + menuWidth + semi
styleStr += "color:"+ fntCol + semi
styleStr += "font-size:"+ fntSiz + semi
styleStr += "font-style:"+ fntSty + semi
styleStr += "font-family:"+ fntFam + semi
styleStr += "font-weight:"+ fntWeight + semi
styleStr += "border-width:" + borWid + semi
styleStr += "border-color:" + borCol + semi
styleStr += "border-style: solid" + semi
styleStr += "cursor: hand" + semi
styleStr += "filter: progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity + ")" + semi
styleStr += "}"
styleStr += "</STYLE>";
document.write(styleStr);
// image settings
if (imgSrc !="") imgStr = "<IMG SRC=" + imgSrc + " BORDER=0 VSPACE=3 WIDHT=7 HEIGHT=7 ALIGN=RIGHT>" 
else imgStr = ""
topCount = 1;
areCreated = false;
isOverMenu = false;
currentMenu = null;
allTimer = null;
function menuSetup(hasParent,lastItem,openCont,openItem) {
	this.menuOver = menuOver;
	this.menuOut = menuOut;
	this.onmouseover = this.menuOver;
	this.onmouseout = this.menuOut;
	this.showIt = showIt;
	this.keepInWindow = keepInWindow;
	this.hideTree = hideTree
	this.hideParents = hideParents;
	this.hideChildren = hideChildren;
	this.hideTop = hideTop;
	this.hasChildVisible = false;
	this.isOn = false;
	this.hideTimer = null;
	if (hasParent) {
		this.hasParent = true;
		this.parentMenu = openCont;
		this.parentItem = openItem;
		this.parentItem.child = this;
	}
	else {
		this.hasParent = false;
		this.hideSelf = hideSelf;
	}

	if (NS) {
		this.fullHeight = lastItem.top + lastItem.document.height;
		this.clip.bottom = this.fullHeight;
	}
	else {
	    this.fullHeight = lastItem.style.pixelTop + lastItem.offsetHeight;
		this.showIt(false);
		this.onselectstart = cancelSelect;
		this.moveTo = moveTo;
		this.moveTo(0,0);
	}
}
function itemSetup(arrayPointer,whichArray) {
	this.itemOver = itemOver;
	this.itemOut = itemOut;
	this.onmouseover = this.itemOver;
	this.onmouseout = this.itemOut;
	this.dispText = whichArray[arrayPointer];
	this.linkText = whichArray[arrayPointer + 1];
	this.hasMore = whichArray[arrayPointer + 2];
	if (this.linkText.length > 0) {
		this.linkIt = linkIt;
		if (NS) {
			this.onfocus = this.linkIt;
		}
		else {
			this.onclick = this.linkIt;
		}
	}
     	if (this.hasMore) {
		htmStr = imgStr + this.dispText;
	}
	else {
		htmStr = this.dispText;
	}
	if (NS) {
		layStr = "<SPAN CLASS=items>" + htmStr+ "</SPAN>";
		this.document.write(layStr);
		this.document.close();
		this.bgColor = backCol;
		this.clip.right = menuWidth;
		this.visibility = "inherit";
		this.container = this.parentLayer;

		if (arrayPointer == 0) {
			this.top = 0;
		}
		else {
			this.top = this.prevItem.top + this.prevItem.document.height - borWid;
		}
		this.left = 0;
	}
	else {
		this.className = "items";
		this.style.padding = 3;
		this.innerHTML = htmStr;

		this.style.backgroundColor = backCol; 
		this.container = this.offsetParent;

		if (arrayPointer == 0) {
			this.style.pixelTop = 0;
		}
		else {
			this.style.pixelTop = this.prevItem.style.pixelTop + this.prevItem.offsetHeight - borWid;
		}
		this.style.pixelLeft = 0;
	}
}
function makeElement(whichEl,whichContainer) {
	if (arguments.length==1)
		whichContainer = (NS) ? window : document.body;

	if (NS) {
		eval(whichEl + "= new Layer(menuWidth,whichContainer)");
	}
	else {
		elStr = "<DIV ID=" + whichEl + " STYLE='position:absolute'></DIV>";
		whichContainer.insertAdjacentHTML("BeforeEnd",elStr);
	}

	return eval(whichEl);
}
function makeTop() {
	while(eval("window.arMenu" + topCount)) {
		topArray = eval("arMenu" + topCount);
		topName = "elmenu" + topCount;
		topMenu = makeElement(topName);
	    	topMenu.setup = menuSetup;
		topItemCount = 0;
		for (i=0; i<topArray.length; i+=3) {
			topItemCount++;
			topItemName = "item" + topCount + "_" + topItemCount;
			topItem = makeElement(topItemName,topMenu);

			if (topItemCount >1)
				topItem.prevItem = eval("item" + topCount + "_" + (topItemCount-1));

			topItem.setup = itemSetup;
			topItem.setup(i,topArray);

			if (topItem.hasMore) makeSecond();
		}
		topMenu.setup(false,topItem);
		topCount++
	}
	areCreated = true;
}
function makeSecond() {
	secondCount = topCount + "_" + topItemCount;
	secondArray = eval("arMenu" + secondCount);
	secondName = "elChild" + secondCount;
	secondMenu = makeElement(secondName);
	secondMenu.setup = menuSetup;
	secondItemCount=0;
	for (j=0; j<secondArray.length; j+=3) {
		secondItemCount++;
		secondItemName = "item" + secondCount +"_" + secondItemCount;

		secondItem = makeElement(secondItemName,secondMenu)		
		
		if (secondItemCount >1)
			secondItem.prevItem = eval("item" + secondCount  + "_" + (secondItemCount-1));

		secondItem.setup = itemSetup;
		secondItem.setup(j,secondArray);

		if (secondItem.hasMore) makeThird();
	}
	secondMenu.setup(true,secondItem,topMenu,topItem);
}
function makeThird() {
	thirdCounter = secondCount + "_" + secondItemCount 
	thirdArray = eval("arMenu" + thirdCounter);
	thirdName = "elGrandChild" + thirdCounter;
	thirdMenu = makeElement(thirdName)
	thirdMenu.setup = menuSetup;
	thirdItemCount=0;
	for (k=0; k<thirdArray.length; k+=3) {
		thirdItemCount++;
		thirdItemName = "item" + thirdCounter + "_" + thirdItemCount;
		thirdItem = makeElement(thirdItemName,thirdMenu);

		if (thirdItemCount >1)
			thirdItem.prevItem = eval("item" + thirdCounter + "_" +(thirdItemCount-1));

		thirdItem.setup = itemSetup;
		thirdItem.setup(k,thirdArray);
	}
	thirdMenu.setup(true,thirdItem,secondMenu,secondItem);
}
function linkIt() {
	location.href = this.linkText;
}
function showIt(on) {
	if (NS) {this.visibility = (on) ? "show" : "hide"}
		else {this.style.visibility = (on) ? "visible" : "hidden"}
}
function keepInWindow() {
	scrBars = 20;
	if (NS) {
		winRight = (window.pageXOffset + window.innerWidth) - scrBars;
		rightPos = this.left + menuWidth;
   
		if (rightPos > winRight) {
			if (this.hasParent) {
				parentLeft = this.parentMenu.left;
				newLeft = ((parentLeft-menuWidth) + childOverLeft);
				this.left = newLeft;
			}
			else {
				dif = rightPos - winRight;
				this.left -= dif;
			}
		}
		winBot = (window.pageYOffset + window.innerHeight) - scrBars;
		botPos = this.top + this.fullHeight;

		if (botPos > winBot) {
			dif = botPos - winBot;
			this.top -= dif;
		}
	}
	else {
    	winRight = (document.body.scrollLeft + document.body.clientWidth) - scrBars;
		rightPos = this.style.pixelLeft + menuWidth;
	
		if (rightPos > winRight) {
			if (this.hasParent) {
				parentLeft = this.parentMenu.style.pixelLeft;
				newLeft = ((parentLeft - menuWidth) + childOverLeft);
				this.style.pixelLeft = newLeft;
			}
			else {
				dif = rightPos - winRight;
				this.style.pixelLeft -= dif;
			}
		}
		winBot = (document.body.scrollTop + document.body.clientHeight) - scrBars;
		botPos = this.style.pixelTop + this.fullHeight;

		if (botPos > winBot) {
			dif = botPos - winBot;
			this.style.pixelTop -= dif;
		}
	}
}
function popUp(menuName,e){
	if (!areCreated) return;
	hideAll();
	currentMenu = eval(menuName);
	if (NS) {
		xPos = e.pageX;
		yPos = e.pageY;
	}
	else  {
		if (menuType == 1) {
	   	   xPos = document.all["ID_" + menuName].offsetLeft;
	  	   yPos = document.all["ID_" + menuName].offsetTop + document.all["ID_" + menuName].offsetHeight;
		}
		else  {
	   	   xPos = document.all["ID_" + menuName].offsetLeft + document.all["ID_" + menuName].offsetWidth - childOverLeft + 1;
	  	   yPos = document.all["ID_" + menuName].offsetTop + childOverTop;
		}
		if (document.all["ID_" + menuName].style.backgroundImage !="")
		document.all["ID_" + menuName].style.backgroundImage = 'url(res/' + menuName + '1.gif)';
		else{
		document.all["ID_" + menuName].style.backgroundColor = mainOverCol;
		document.all["ID_" + menuName].style.color = mainFntOverCol;
		}
	}
	currentMenu.moveTo(xPos,yPos);
	currentMenu.keepInWindow()
	currentMenu.isOn = true;
	currentMenu.showIt(true);
}
function popDown(menuName){ 
	if (!areCreated) return;
	whichEl = eval(menuName);
	whichEl.isOn = false;
	whichEl.hideTop();
	if (!NS){
		if (document.all["ID_" + menuName].style.backgroundImage !="")
		document.all["ID_" + menuName].style.backgroundImage = 'url(res/' + menuName + '0.gif)';
		else{
		document.all["ID_" + menuName].style.backgroundColor = mainBackCol;
		document.all["ID_" + menuName].style.color = mainFntCol;
		}
	}
}
function menuOver() {
	this.isOn = true;
	isOverMenu = true;
	currentMenu = this;
	if (this.hideTimer) clearTimeout(this.hideTimer);
}
function menuOut() {
	if (IE && event.srcElement.contains(event.toElement)) return;
	this.isOn = false;
	isOverMenu = false;
	if (IE) allTimer = setTimeout("currentMenu.hideTree()",10); 
}
function itemOver(){
	if (IE && event.srcElement.tagName == "IMG") return;
	if (NS) {
		this.bgColor = overCol;
	}
	else {
		this.style.backgroundColor = overCol;
		this.style.color = fntOverCol;
	}
	
	if (this.container.hasChildVisible) {
		this.container.hideChildren(this);
	}            
	if(this.hasMore) {
		if (NS) {
			this.childX = this.container.left + (menuWidth - childOverLeft);
			this.childY = this.pageY + childOverTop;
		}
		else {
			this.childX = this.container.style.pixelLeft + (menuWidth - childOverLeft);
			this.childY = this.style.pixelTop + this.container.style.pixelTop + childOverTop;
		}

		this.child.moveTo(this.childX,this.childY);
		this.child.keepInWindow();
		this.container.hasChildVisible = true;
		this.container.visibleChild = this.child;
		this.child.showIt(true);
	}
}
function itemOut() {
    if (IE && (event.srcElement.contains(event.toElement)
     || (event.fromElement.tagName=="IMG" && event.toElement.contains(event.fromElement))))
        return;
	if (NS) {
		this.bgColor = backCol;
		if (!isOverMenu) {
			allTimer = setTimeout("currentMenu.hideTree()",10);
		}
	}
	else {
		this.style.backgroundColor = backCol;
		this.style.color = fntCol;
	}
}
function hideAll() {
	for(i=1; i<topCount; i++) {
		temp = eval("elmenu" + i);
		temp.isOn = false;
		if (temp.hasChildVisible) temp.hideChildren();
		temp.showIt(false);
	}	
}
function hideTree() { 
	allTimer = null;
	if (isOverMenu) return;
	if (this.hasChildVisible) {
		this.hideChildren();
	}
	this.hideParents();
}
function hideChildren(item) {
	if (this.visibleChild.hasChildVisible) {
		this.visibleChild.visibleChild.showIt(false);
		this.visibleChild.hasChildVisible = false;
	}

	if (!this.isOn || !item.hasMore || this.visibleChild != this.child) {
		this.visibleChild.showIt(false);
		this.hasChildVisible = false;
	}
}
function hideParents() {     
	if (this.hasParent) {
		this.showIt(false);
		if (this.parentMenu.hasParent) {
			this.parentMenu.isOn = false;		
			this.parentMenu.showIt(false);
			this.parentMenu.parentMenu.isOn = false;
			whichEl = this.parentMenu.parentMenu
		}
		else {
			this.parentMenu.isOn = false;
			whichEl = this.parentMenu;
		}
	}
	else {
		whichEl = this;
	}
	whichEl.hideTop();
}
function hideTop() {
	whichEl = this;
	this.hideTimer = setTimeout("whichEl.hideSelf()",mSecsVis);
}
function hideSelf() {
	this.hideTimer = null;
	if (!this.isOn && !isOverMenu) { 
		this.showIt(false);
	}
}
function cancelSelect(){return false}
function moveTo(xPos,yPos) {
	this.style.pixelLeft = xPos;
	this.style.pixelTop = yPos;
}
window.onload = makeTop;
// First Level Items MouseOver Style
function chgPageStl(OverStyle,divID) {
	if (!NS){
		if (OverStyle==1){
			hideAll();
			if (document.all["ID_elpage" + divID].style.backgroundImage !="")
			document.all["ID_elpage" + divID].style.backgroundImage = 'url(res/elpage' + divID + '1.gif)';
			else{
			document.all["ID_elpage" + divID].style.backgroundColor = mainOverCol;
			document.all["ID_elpage" + divID].style.color = mainFntOverCol;
			}
		}
		else {
			if (document.all["ID_elpage" + divID].style.backgroundImage !="")
			document.all["ID_elpage" + divID].style.backgroundImage = 'url(res/elpage' + divID + '0.gif)';	
			else{
			document.all["ID_elpage" + divID].style.backgroundColor = mainBackCol;
			document.all["ID_elpage" + divID].style.color = mainFntCol;
			}
		}
	}
}
// Code by Stefano Ranfagni. Incomedia.it. All rights reserved.
// Link Description
function ViewTip(Txt,backgColor,textColor,borderdColor,textSize,doFadeFlag) {
HideTip();
buf="<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=2 BGCOLOR=" + backgColor +" style=\"border: 1px solid " + borderdColor + "\"><TR><TD><FONT FACE=\"Tahoma, Arial\" SIZE=" + textSize + " COLOR=" + textColor + ">" + Txt + "</FONT></TD></TR></TABLE>";
document.all.imToolTip.innerHTML = buf;
document.all.imToolTip.style.left=event.x;
document.all.imToolTip.style.top=event.y + 15;
document.all.imToolTip.style.visibility="visible";
fadeStep=0
if (doFadeFlag) doFade();
}
function HideTip() {
document.all.imToolTip.style.visibility="hidden";
if (typeof oTime !== 'undefined') clearTimeout(oTime);
document.all.imToolTip.style.filter="alpha(opacity=100)";
}
function doFade(){
if (fadeStep<=100){
	fadeStep+=15;
	document.all.imToolTip.style.filter="alpha(opacity=" + fadeStep + ")";
	oTime=setTimeout('doFade()', 50);
	}
}
// PopUpWindows
function popUpWin(page,w,h,sb){
if ((w==-1) || (h==-1)){
prop='fullscreen, scrollbars=No';
}else{
	l=(screen.width)?(screen.width-w)/2:100;
	t=(screen.height)?(screen.height-h)/2:100;
prop='width='+ w + ',height='+ h + ',top=' + t + ',left=' + l + ',scrollbars='+ sb +',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
}
popUpWinWindow=window.open(page,'',prop);
popUpWinWindow.focus();
}
// SlideShow
var iLastSlide
var iCount=1;
var iAutoDelay
function doTrans(iStep, iLast, bPosition){
	iCount=(bPosition == 1)? iStep : iCount=iCount+iStep;
	if (iCount == iLast+1) iCount=1;
	if (iCount == 0) iCount=iLast;
	if (IE50 == false) div_Main.filters.item(0).Apply();
	sContent="<img src=\"" + document.all["img_" + iCount].src + "\" border=\"0\" galleryimg=\"no\">";
	if (document.all["img_" + iCount].title !="") sContent= document.all["img_" + iCount].title + sContent + "</a>";
	if (document.all["img_" + iCount].alt !="") sContent= sContent + "<div style=\"padding: 3px; font: 8pt Arial\">" + document.all["img_" + iCount].alt + "</div>";
	div_Main.innerHTML="<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\"><tr><td width=\"100%\" align=\"center\">" + sContent + "</td></tr></table>";
	if (IE50 == false) div_Main.filters.item(0).Play();
}
function doAuto(){
	doTrans(1,iLastSlide,0);
	oTime=setTimeout('doAuto()', iAutoDelay);
}
function PlayStop(iLast,iDelay,bAutoStart){
	iLastSlide=iLast;
	iAutoDelay=iDelay*1000;
	if (bAutoStart == 1)
		oTime=setTimeout('doAuto()', iAutoDelay);
	else{
		if (cmd_Auto.alt == 'Pause') {
			cmd_Auto.alt='Play';
			cmd_Auto.src='res/ss_play.gif';
			clearTimeout(oTime);
		}
		else {
			cmd_Auto.alt='Pause';
			cmd_Auto.src='res/ss_pause.gif';
			doTrans(1,iLastSlide,0);
			oTime=setTimeout('doAuto()', iAutoDelay);
		}
	}
}
function ShowDate(){
var now=new Date();
document.write("DomLunMarMerGioVenSab".substr(now.getDay()*3,3)+' '+now.getDate()+' '+"GenFebMarAprMagGiuLugAgoSetOttNovDic".substr(now.getMonth()*3,3)+', '+now.getFullYear());
}