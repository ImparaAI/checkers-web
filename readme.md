A Lumen/React web site for playing checkers against an AI.

This was built to work in conjunction with the [prediction app](https://github.com/ImparaAI/checkers-prediction) and can easily be run in a Kubernetes cluster [here](https://github.com/ImparaAI/checkers-kubernetes).

# Development

Developing in the Kubernetes cluster requires adding  `development_volume` value to your `values.yaml` file in the [imparaai/checkers-kubernetes](https://github.com/ImparaAI/checkers-kubernetes) repo an example of which can be seen in the `web` section of the [`values.example.yaml`](https://github.com/ImparaAI/checkers-kubernetes/blob/master/values.example.yaml) file.

## Installation

Exec into the web container in the Kubernetes cluster and you should be dumped onto `/var/www`. From here, run the following:

```bash
composer install
yarn install
```

This will build the PHP and JS build dependencies.

To build:

```bash
npm run-script build
```

Build on any file changes:

```bash
npm run-script watch
```

To test:

```bash
npm run-script test
```