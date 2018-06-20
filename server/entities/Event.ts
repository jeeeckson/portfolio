import {User} from "./User";
const {Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} = require("typeorm");
//const User = require('./User');

/**
 * Represents a dates that might perform a event.
 */
@Entity("events")
export class Event {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @PrimaryColumn("int")
    id: number;

    /**
     * The own of the date, never null.
     */
    @ManyToOne(type => User)
    @Column("int", {name: 'user_id', nullable: false})
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    owner: User;

    /**
     *  Date of the date, never null.
     */
    @CreateDateColumn()
    createDate: Date;

    /**
     * The event date, never null.
     */
    @Column('datetime', {name: "event_date"})
    eventDate: Date;

    /**
     * The location of the date, never null.
     */
    @Column("text", {nullable: false})
    location: string;

    /**
     * The description of the date, never null.
     */
    @Column("text", {nullable: false})
    description: string;

    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param owner {User} Name of the user owner, cannot be null.
     * @param createDate {Date} Date create of the user, cannot be null.
     * @param eventDate {Date} Date event of the event, cannot be null.
     * @param location {string} location of the event, cannot be null.
     * @param description {string} description of the event, cannot be null.
     */
    constructor(owner: User, createDate: Date, eventDate: Date, location: string, description: string) {
        if (!arguments.length) {
            return;
        }
        this.owner = owner;
        this.createDate = createDate;
        this.eventDate = eventDate;
        this.location = location;
        this.description = description;
    }
}