import {Entity, PrimaryColumn, Column} from "typeorm";

/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
@Entity("users")
export class User {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @PrimaryColumn("int")
    id:number;

    /**
     * The name of the user, never null.
     */
    @Column("text")
    username:string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text", {nullable: true})
    password:string;

    /**
     * Boolean to specify if is admin or user, cannot be null.
     */
    @Column("int")
    admin:number;

    /**
     * The name of the user, never null.
     */
    @Column("text")
    name:string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text")
    lastName:string;

    /**
     * Boolean to specify if is admin or user, cannot be null.
     */
    @Column("int")
    age:number;


    /**
     * The name of the user, never null.
     */
    @Column("text")
    route:string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text", {nullable: true})
    number:string;

    /**
     * Boolean to specify if is admin or user, cannot be null.
     */
    @Column("int")
    state:number;

    /**
     * City of user, cannot be null.
     */
    @Column("int")
    city:number;

    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param username {string}   name of the user, cannot be null.
     * @param password {string}  password of the user, cannot be null.
     * @param admin {boolean}  specify if is admin or user, cannot be null.
     */
    constructor(username:string, password:string, admin:boolean) {
        if (!arguments.length) {
            return;
        }
        this.username = username;
        this.password = password;
        this.admin = admin? 1: 0;
    }

}