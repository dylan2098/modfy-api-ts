import keyTokenModel from "../models/keyToken.model";
import { KeyToken } from "../types/access.type";

class KeyTokenService {
    find = async (payload: KeyToken) => {
        return keyTokenModel.find(payload);
    }
}

export default new KeyTokenService();