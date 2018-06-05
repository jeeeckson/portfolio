import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./User";

/**
 * Represents a User that might be use the application can be an admin
 * with more privileges or a simple user.
 */
@Entity("users")
export class Address {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @ManyToOne(type => User)
    @PrimaryColumn("int", {name: 'user_id'})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    /**
     * The route of the user, never null.
     */
    @Column("text")
    route: string;

    /**
     * Number of user, cannot be null.
     */
    @Column("int")
    number: number;

    /**
     * State user, cannot be null.
     */
    @Column("text")
    state: string;

    /**
     * City of user, cannot be null.
     */
    @Column("text")
    city: string;

    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param user {User} The user, cannot be null.
     * @param route {string} Route of the user, cannot be null.
     * @param number {int} Route of the user, cannot be null.
     * @param state {string} Route of the user, cannot be null.
     * @param city {string} Route of the user, cannot be null.
     */
    constructor(user: User, route: string, number: number, state: string, city: string) {
        if (!arguments.length) {
            return;
        }
        this.user = user;
        this.route = route;
        this.number = number;
        this.state = state;
        this.city = city;
    }

}