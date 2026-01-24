-- On valide les changements seulement si toutes les opérations ont réussi
CREATE OR REPLACE FUNCTION update_other_db(project_id integer) integer AS $$

BEGIN TRANSACTION;

	UPDATE Nocodb.project
		SET name = 'New Name'
		WHERE id = project_id;

	UPDATE Outline.project
		SET name = 'New Name'
		WHERE id = project_id;

COMMIT;
$$ LANGUAGE plpgsql;


-- Mise à jour des autres bases si un projet est renommé
CREATE TRIGGER check_update
    AFTER UPDATE ON Mattermost.project
	REFERENCING NEW TABLE AS newtable
    FOR EACH ROW
    EXECUTE FUNCTION update_other_db(newtable.id);