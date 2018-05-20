# Exstension

## Structure overview

- config/
- main/
- renderer/
- shared/
- index.ts

### config/

Contains a json file with the extensions configurations.

### main/

Code that runs in the electron browser process. May run each extension in their own process eventually.

### renderer/

The ui code, which is the angular. The plan is to make this more modular instead of being directly attached to the core angular module.

### shared/

General code used by the renderer or the main.


## Creating an extension

I will explain building the processes-list2 extension.

Create the initial files and folders.

- processes-list2/
  - config/
    - processes-list2.config.json
  - main/
    - processes-list2.extension.ts
  - renderer/
  - shared/
  - index.ts
