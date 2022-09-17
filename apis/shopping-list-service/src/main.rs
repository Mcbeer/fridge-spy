use axum::{extract::Extension, routing::get, Json, Router};
use migration::{Migrator, MigratorTrait};
use std::net::SocketAddr;

// struct State<'a> {
//     connection: &'a mut diesel::PgConnection,
// }

#[tokio::main]
async fn main() {
    // let shared_state = Arc::new(Mutex::new(State {
    //     connection: &mut connection,
    // }));

    let database_url = dotenvy::var("DATABASE_URL").unwrap();

    let connection = sea_orm::Database::connect(&database_url).await?;
    Migrator::up(&connection, None).await?;

    // Create a mutable variable to "house" the server
    let app = Router::new().route("/", get(handler));

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);

    // start the http server
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> String {
    "Hello World!".to_string()
}
