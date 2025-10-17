package bachiller_programacion.gid.service;

import bachiller_programacion.gid.model.Query;
import bachiller_programacion.gid.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Optional<Query> getQueryById(Integer id) {
        return queryRepository.findById(id);
    }

    public Query createQuery(Query query) {
        query.setCreatedAt(LocalDateTime.now());
        query.setUpdatedAt(LocalDateTime.now());
        return queryRepository.save(query);
    }

    public Query updateQuery(Integer id, Query queryData) {
        return queryRepository.findById(id)
                .map(existing -> {
                    existing.setName(queryData.getName());
                    existing.setScript(queryData.getScript());
                    existing.setFields(queryData.getFields());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return queryRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Query no encontrada con id: " + id));
    }

    public void deleteQuery(Integer id) {
        queryRepository.deleteById(id);
    }
}
