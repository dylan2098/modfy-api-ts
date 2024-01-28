import { Request, Response, NextFunction } from 'express';

export default (permission: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.objKey.permissions);
    // if (!req.objKey.permissions) {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    // const validPermission = req.objKey.permissions.includes(permission);
    // if (!validPermission) {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    // return next();
  };
};
