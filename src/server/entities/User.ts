const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
@Entity("users")
export class User {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * The name of the user, never null.
     */
    @Column("text")
    username: string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text")
    password: string;

    /**
     * Boolean to specify if is admin or user, cannot be null. {enabled: boolean}
     */
    @Column("int")
    admin: number;

    /**
     * The name of the user, never null.
     */
    @Column("text", {nullable: true})
    name: string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text", {nullable: true})
    lastName: string;

    /**
     * Boolean to specify if is admin or user, cannot be null.
     */
    @Column("int", {nullable: true})
    age: number;


    /**
     * The name of the user, never null.
     */
    @Column("text", {nullable: true})
    route: string;

    /**
     * The password of the user will be hased, cannot be null.
     */
    @Column("text", {nullable: true})
    number: string;

    /**
     * Boolean to specify if is admin or user, cannot be null.
     */
    @Column("text", {nullable: true})
    state: string;

    /**
     * City of user, cannot be null.
     */
    @Column("text", {nullable: true})
    city: string;

    /**
     * City of user, cannot be null.
     */
    @Column("text")
    handle: string;

    /**
     * The friends from users, never null.
     */
    @Column("simple-array", {nullable: true})
    friends: object[];


    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param username {string}   name of the user, cannot be null.
     * @param password {string}  password of the user, cannot be null.
     * @param admin {boolean}  specify if is admin or user, cannot be null.
     */
    constructor(username: string, password: string, admin: boolean) {
        if (!arguments.length) {
            return;
        }
        this.friends = [];
        this.username = username;
        this.password = password;
        this.admin = admin ? 1 : 0;
    }

}
