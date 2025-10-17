package bachiller_programacion.gid.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import bachiller_programacion.gid.model.Query;

@Repository
public interface QueryRepository extends JpaRepository<Query, Integer> {
}
