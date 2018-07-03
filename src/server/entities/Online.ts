const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

/**
 * Represents a dates that might perform a event.
 */
@Entity("onlines")
export class Online {

    /**
     * The unique identifier of the user, cannot be null.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * The description of the date, never null.
     */
    @Column("text", {nullable: false})
    handle: string;

    /**
     * The description of the date, never null.
     */
    @Column("text", {nullable: false})
    connection_id: string;

    /**
     * Constructor with mandatory parameters.
     * Any parameter cannot be null.
     * @param handle {string} cannot be null.
     * @param connection_id {string} cannot be null.
     */
    constructor(handle: string, connection_id: string) {
        if (!arguments.length) {
            return;
        }
        this.handle = handle;
        this.connection_id = connection_id;
    }
}
