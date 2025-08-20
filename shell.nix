{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.deno
    pkgs.postgresql
  ];
  shellHook = ''
    echo "Welcome to the Dino Nix Shell!"
    if [ -d ".data/postgresql" ]; then
      echo "Database directory found."
      echo -e "To start postgreSQL use \e[1mrunDatabase\e[0m."
    else
      echo "No database directory found."
      echo -e "To initialize postgreSQL use \e[1minitDatabase\e[0m and run the database with \e[1mrunDatabase\e[0m."
      echo -e "Create the database with \e[1mcreateDatabase\e[0m."
    fi
    echo -e "When you are done, stop postgreSQL with \e[1mstopDatabase\e[0m."
    echo -e "Type \e[1mrun\e[0m to run the application."  
    alias initDatabase='initdb -D .data/postgresql'
    alias runDatabase='pg_ctl -D .data/postgresql -l logfile -o "--unix_socket_directories=$PWD" start'
    alias createDatabase='createdb -h $PWD dino'
    alias stopDatabase='pg_ctl -D .data/postgresql stop'
    alias run='deno run --allow-net main.ts'
  '';
}
