(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{D8zm:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),a=function(){return function(){}}(),i=u("pMnS"),t=function(){function l(l,n){this._bannerService=l,this._config=n,this.images=new Array,this.uploadLabel=new Array(6),this.filesToUpload=[],this.cat_name="",this.list=new Array}return l.prototype.ngOnInit=function(){var l=this;this._bannerService.getBanners().subscribe((function(n){l.variant=n.banners,l.list=n.banners;for(var u=0;u<6;u++)u<l.variant.length?(l.images[u]=l._config.bannerUrl+l.variant[u].image,l.uploadLabel[u]="Change Image"):l.uploadLabel[u]="Upload Image"}))},l.prototype.changeImage=function(l,n,u){var e=this,a=new FileReader;l[0].size>2e6?window.alert("Please upload image less than < 2 MB"):null!=l[0].type.match(/image\/*/)?(this.filesToUpload=u.target.files,a.readAsDataURL(l[0]),a.onload=function(l){var u=new Image;u.src=a.result,u.onload=function(){(u.width<800||u.height<800)&&window.alert("Please select image with minimum resolution 800*800")},e.images[n]=a.result}):window.alert("Please select images only")},l.prototype.uploadImage=function(l,n){var u=this,e=0;if("Image Uploaded"!==this.uploadLabel[n])try{if(l[0].size>2e6)return window.alert("Please upload image less than < 2 MB"),void(e=1);if(null==l[0].type.match(/image\/*/))return window.alert("Please select images only"),void(e=1);var a=new FileReader;a.readAsDataURL(l[0]),a.onload=function(i){var t=new Image;t.src=a.result,t.onload=function(){if(0==e){for(var a=new FormData,i=u.filesToUpload,t=0;t<i.length;t++)a.append("uploads[]",i[t],l[t].name);n<u.list.length?u._bannerService.editUploadedImage(a,u.variant[n].id).subscribe((function(l){u.uploadLabel[n]="Image Uploaded"}),(function(l){window.alert("Image is not uploaded. Please try again")})):u._bannerService.uploadImage(a,0).subscribe((function(l){u.uploadLabel[n]="Image Uploaded"}),(function(l){console.log(l)}))}}}}catch(i){window.alert("Please select the files")}else window.alert("This image uploaded already")},l}(),r=u("t/Na"),s=u("dQhb"),c=function(){function l(l,n){this._http=l,this._config=n,this.service="banner/",this.getBannersUrl=this._config.apiBaseUrl+this.service+"get-banners",this.uploadImageUrl=this._config.apiBaseUrl+this.service+"upload-image/",this.editImageUtl=this._config.apiBaseUrl+this.service+"editImageUpload/"}return l.prototype.getBanners=function(){var l=this._config.getHeader();return this._http.get(this.getBannersUrl,l)},l.prototype.uploadImage=function(l,n){var u=this._config.getHeader();return this._http.post(this.uploadImageUrl+n,l,u)},l.prototype.editUploadedImage=function(l,n){var u=this._config.getHeader();return this._http.post(this.editImageUtl+n,l,u)},l.ngInjectableDef=e.Mb({factory:function(){return new l(e.Nb(r.c),e.Nb(s.a))},token:l,providedIn:"root"}),l}(),o=e.pb({encapsulation:0,styles:[[""]],data:{}});function d(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,85,"div",[["class","page-wrapper"]],null,null,null,null,null)),(l()(),e.rb(1,0,null,null,84,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e.rb(2,0,null,null,3,"div",[["class","row page-titles"]],null,null,null,null,null)),(l()(),e.rb(3,0,null,null,2,"div",[["class","col-md-5 align-self-center"]],null,null,null,null,null)),(l()(),e.rb(4,0,null,null,1,"h4",[["class","text-themecolor"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["Add Banner Image"])),(l()(),e.rb(6,0,null,null,79,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(7,0,null,null,78,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),e.rb(8,0,null,null,77,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.rb(9,0,null,null,76,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(10,0,null,null,75,"form",[["action","#"]],null,null,null,null,null)),(l()(),e.rb(11,0,null,null,74,"div",[["class","form-body"]],null,null,null,null,null)),(l()(),e.rb(12,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,["About Banner Images"])),(l()(),e.rb(14,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e.rb(15,0,null,null,70,"div",[["class","card"]],null,null,null,null,null)),(l()(),e.rb(16,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Upload Images of Category (Supported format :- .jpg, .jpeg, .png, .gif ) "])),(l()(),e.rb(18,0,null,null,67,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(19,0,null,null,66,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.rb(20,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(21,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(22,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Main Image "])),(l()(),e.rb(24,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(25,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(26,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(27,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(28,0,[["file1",1]],null,0,"input",[["accept",".png, .jpg ,.jpeg ,.gif"],["class","custome-file-input"],["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,28).files,0,u)&&a),a}),null,null)),(l()(),e.rb(29,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,28).files,0)&&a),a}),null,null)),(l()(),e.Hb(30,null,["",""])),(l()(),e.rb(31,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(32,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(33,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Image 1 "])),(l()(),e.rb(35,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(36,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(37,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(38,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(39,0,[["file2",1]],null,0,"input",[["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,39).files,1,u)&&a),a}),null,null)),(l()(),e.rb(40,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,39).files,1)&&a),a}),null,null)),(l()(),e.Hb(41,null,["",""])),(l()(),e.rb(42,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(43,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(44,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Image 2 "])),(l()(),e.rb(46,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(47,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(48,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(49,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(50,0,[["file3",1]],null,0,"input",[["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,50).files,2,u)&&a),a}),null,null)),(l()(),e.rb(51,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,50).files,2)&&a),a}),null,null)),(l()(),e.Hb(52,null,["",""])),(l()(),e.rb(53,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(54,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(55,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Image 3 "])),(l()(),e.rb(57,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(58,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(59,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(60,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(61,0,[["file4",1]],null,0,"input",[["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,61).files,3,u)&&a),a}),null,null)),(l()(),e.rb(62,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,61).files,3)&&a),a}),null,null)),(l()(),e.Hb(63,null,["",""])),(l()(),e.rb(64,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(65,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(66,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Image 4 "])),(l()(),e.rb(68,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(69,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(70,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(71,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(72,0,[["file5",1]],null,0,"input",[["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,72).files,4,u)&&a),a}),null,null)),(l()(),e.rb(73,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,72).files,4)&&a),a}),null,null)),(l()(),e.Hb(74,null,["",""])),(l()(),e.rb(75,0,null,null,10,"div",[["class","image-container"]],null,null,null,null,null)),(l()(),e.rb(76,0,null,null,9,"div",[["class","card image-card"]],null,null,null,null,null)),(l()(),e.rb(77,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e.Hb(-1,null,[" Image 5 "])),(l()(),e.rb(79,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e.rb(80,0,null,null,5,"form",[["enctype","multipart/form-data"]],null,null,null,null,null)),(l()(),e.rb(81,0,null,null,1,"div",[["class","image"]],null,null,null,null,null)),(l()(),e.rb(82,0,null,null,0,"img",[["alt","Add-image"],["height","100%"],["width","100%"]],[[8,"src",4]],null,null,null,null)),(l()(),e.rb(83,0,[["file6",1]],null,0,"input",[["id","file"],["type","file"]],null,[[null,"change"]],(function(l,n,u){var a=!0;return"change"===n&&(a=!1!==l.component.changeImage(e.Cb(l,83).files,5,u)&&a),a}),null,null)),(l()(),e.rb(84,0,null,null,1,"button",[["class","btn btn-outline-success"],["style","margin-top:10px;width:100%;"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==l.component.uploadImage(e.Cb(l,83).files,5)&&a),a}),null,null)),(l()(),e.Hb(85,null,["",""]))],null,(function(l,n){var u=n.component;l(n,27,0,u.images[0]),l(n,29,0,"Image Uploaded"===u.uploadLabel[0]),l(n,30,0,u.uploadLabel[0]),l(n,38,0,u.images[1]),l(n,40,0,"Image Uploaded"===u.uploadLabel[1]),l(n,41,0,u.uploadLabel[1]),l(n,49,0,u.images[2]),l(n,51,0,"Image Uploaded"===u.uploadLabel[2]),l(n,52,0,u.uploadLabel[2]),l(n,60,0,u.images[3]),l(n,62,0,"Image Uploaded"===u.uploadLabel[3]),l(n,63,0,u.uploadLabel[3]),l(n,71,0,u.images[4]),l(n,73,0,"Image Uploaded"===u.uploadLabel[4]),l(n,74,0,u.uploadLabel[4]),l(n,82,0,u.images[5]),l(n,84,0,"Image Uploaded"===u.uploadLabel[5]),l(n,85,0,u.uploadLabel[5])}))}function b(l){return e.Jb(0,[(l()(),e.rb(0,0,null,null,1,"app-add-banner",[],null,null,null,d,o)),e.qb(1,114688,null,0,t,[c,s.a],null,null)],(function(l,n){l(n,1,0)}),null)}var g=e.nb("app-add-banner",t,b,{},{},[]),p=u("Ip0R"),m=u("ZYCi"),f=function(){return function(){}}();u.d(n,"BannerModuleNgFactory",(function(){return h}));var h=e.ob(a,[],(function(l){return e.Ab([e.Bb(512,e.j,e.Z,[[8,[i.a,g]],[3,e.j],e.x]),e.Bb(4608,p.l,p.k,[e.u,[2,p.s]]),e.Bb(1073742336,p.b,p.b,[]),e.Bb(1073742336,m.m,m.m,[[2,m.r],[2,m.k]]),e.Bb(1073742336,f,f,[]),e.Bb(1073742336,a,a,[]),e.Bb(1024,m.i,(function(){return[[{path:"",component:t}]]}),[])])}))}}]);