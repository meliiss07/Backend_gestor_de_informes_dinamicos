package bachiller_programacion.gid.controller;

import bachiller_programacion.gid.model.Query;
import bachiller_programacion.gid.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = "*")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @GetMapping
    public List<Query> getAllQueries() {
        return queryService.getAllQueries();
    }

    @GetMapping("/{id}")
    public Query getQueryById(@PathVariable Integer id) {
        return queryService.getQueryById(id)
                .orElseThrow(() -> new RuntimeException("Query no encontrada con id: " + id));
    }

    @PostMapping
    public Query createQuery(@RequestBody Query query) {
        return queryService.createQuery(query);
    }

    @PutMapping("/{id}")
    public Query updateQuery(@PathVariable Integer id, @RequestBody Query query) {
        return queryService.updateQuery(id, query);
    }

    @DeleteMapping("/{id}")
    public void deleteQuery(@PathVariable Integer id) {
        queryService.deleteQuery(id);
    }
}
