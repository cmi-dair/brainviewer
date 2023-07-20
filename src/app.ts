import { SurfaceMesh, MeshColors, Surface } from "./brainViewer";
import { ViewerClient } from "./viewer";

export const run = (api_surface: Promise<Response>) => {
  api_surface
    .then((response) => {
      return response.json();
    })
    .then((json) => {
        const vertices: number[] = [];
        const faces: number[] = [];
        for (let i = 0; i < json["xCoordinate"].length; i++) {
            vertices.push(json["xCoordinate"][i]);
            vertices.push(json["yCoordinate"][i]);
            vertices.push(json["zCoordinate"][i]);
        }
        for (let i = 0; i < json["iFaces"].length; i++) {
            faces.push(json["iFaces"][i]);
            faces.push(json["jFaces"][i]);
            faces.push(json["kFaces"][i]);
        }
        fetch("http://localhost:8000/features/cross_species?seed_species=human&seed_side=left&seed_vertex=1").then(
            (response) => {
                return response.json();
            }
        ).then((data_json) => {

          const mesh = new SurfaceMesh(new Float32Array(vertices), new Uint32Array(faces));
          const colors = new MeshColors(data_json["human_left"], "Viridis", [-1, 2]);
          const surface = new Surface(mesh, colors);
          const client = new ViewerClient(surface);
          client.setModel(surface.mesh, surface.colors);
          client.addListener("dblclick", (event: any) => { console.log(event) });
          client.setCameraPosition({ up: { x: 0, y: -1, z: 0 }, 
                                     position: { x: 0, y: 0, z: 0 },
                                     scale: { x: 2, y: 1, z: 1 },
                                     rotation: { x: 90, y: 90, z: 0}})
      });
    });
};  
