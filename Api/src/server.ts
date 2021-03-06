import express, { NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

const app = express();
const port = 3001;

  // CORS Should be restricted
app.use((req, res, next) => {
    console.log('my path ' + req.path); // this is /api/api/validateReferences when is coming from ionic angular
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const csrfProtection = csurf({
    cookie: true,
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});
app.use(cookieParser());
app.use('/', csrfProtection, (req, res, next): void => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    console.log('im in here');
    next();
});

// post route
app.use('api/validate', csrfProtection, ( req, res ) => {
    console.log(req.body);
    return res.send({message: 'response from server in your post request'});
});

// post route
app.use(( req, res ) => {
    console.log(req.body);
    return res.send({message: 'I am running'});
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).send({message: err.message})
    }
  });

app.use(async (req, res) => {
    console.log(req.path);
    console.log(`not found here ${req.path}`);
    return res.status(404).send('route not found');
});
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});