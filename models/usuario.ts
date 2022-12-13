import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { genSaltSync, hashSync } from 'bcryptjs';
import db from '../database/connection';

// Modelo Usuario

interface IUsuario {
    id:       number;
    nombre:   string;
    email:    string;
    password: string;
    estado:   boolean;
}

type OptionalAttributes = Optional<IUsuario,'estado'>;

class Usuario extends Model<IUsuario, OptionalAttributes> {
    // public fields (will be shown during autocomplete)
    declare id:       number;
    declare nombre:   string;
    declare email:    string;
    declare password: string;
    declare estado:   CreationOptional<boolean>;
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(psw: string){
            this.setDataValue('password', hashSync(psw, genSaltSync()));
        },
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    modelName: 'usuario', // modelo
    sequelize: db                    // conexion
})


export default Usuario;