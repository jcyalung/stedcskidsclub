QUASAR_PORT=8000

CORE_V4_HOST=sce@${CORE_V4_IP}


num_args=$#
arg=$1

check_valid_arg_amount() {
  if [ "$((num_args))" -ne 1 ];
  then
    echo "Error: expected 1 argument only."
    echo "usage: ./tunnel.sh [start]/[stop]"
    exit 1
  fi
}

choose_startup() {
  check_valid_arg_amount
  if [[ ${arg} == "start" ]]; then
    echo -e "Starting tunnel and api"
    start_backend & start_api
  elif [[ ${arg} == "stop" ]]; then
    echo -e "\eStopping tunnel"
    stop_ssh_tunnel
    echo -e "Stopping api"
    stop_api
  else
    echo -e "Not a valid command"
    exit 1
  fi
}

# # Start the tunnel!
start_backend() {
    cd api
    python server.py
}

stop_ssh_tunnel () {
  kill -QUIT $(pgrep -f localhost)
}

start_api() {
    npm start --prefix stedcs
}

stop_api() {
  kill -9 $(lsof -i TCP:8000 | grep LISTEN | awk '{print $2}')
}

choose_startup