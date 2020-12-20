var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use('/twap', express.static('/opt/vfat-tools/twap'));
app.listen(5000);