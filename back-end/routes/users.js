var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var user1 ='user1'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log("username in storage:"+req.session.user);

        cb(null, file.fieldname + '-' + req.session.user + '.jpg')
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var resArr = [];

    glob("public/uploads/mypic-"+req.session.user+".jpg", function (er, files) {
        //req.session.username - user1
        var resArr = files.map(function (file) {
            img = 'uploads/'+file.split('/')[2];
            console.log("imgg: "+img);
            return img;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });

});

router.post('/upload', upload.single("mypic"), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    console.log("username in upload:"+req.session.user);
    res.status(204).end();
});

module.exports = router;

