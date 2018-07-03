import {User} from "./User";
const {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} = require("typeorm");

/**
 * Represents a dates that might perform a event.
 */
@Entity("messages")
export class Message {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * The own of the date, never null.
     */
    @ManyToOne(type => User)
    @Column("int", {name: 'user_id', nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    sender: User;

    /**
     * The own of the date, never null.
     */
    @ManyToOne(type => User)
    @Column("int", {name: 'user_id', nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    receiver: User;

    /**
     *  Date of the date, never null.
     */
    @CreateDateColumn()
    createDate: Date;

    /**
     * The description of the date, never null.
     */
    @Column("text", {nullable: false})
    message: string;

    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param sender {User} Name of the user sender, cannot be null.
     * @param receiver {User} Name of the user receiver, cannot be null.
     * @param message {string} message, cannot be null.
     */
    constructor(sender: User, receiver: User, message: string) {
        if (!arguments.length) {
            return;
        }
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }
}
