CREATE OR REPLACE FUNCTION notify_after_insert()
RETURNS TRIGGER AS
$BODY$
    BEGIN
        PERFORM pg_notify('row inserted', row_to_json(NEW)::text);
        RETURN new;
    END;
$BODY$ LANGUAGE plpgsql

CREATE TRIGGER new_row_trigger
AFTER INSERT ON users
FOR EACH ROW EXECUTE PROCEDURE notify_after_insert();


