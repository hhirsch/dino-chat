# Dino Chat
A chat server in deno.

[Download](https://nixos.org/download/) and Install Nix the package manager.

Setup your environment with
```
nix-shell
```
Additional setup information will be displayed.

Run the project with
```
deno run main.ts
```

To install the dependencies in your nix-environment (e.g. to use "deno lsp" or to install the packages on your target system).
```
nix-env -f shell.nix -iA all
```
