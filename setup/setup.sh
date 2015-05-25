echo "Starting setup..."

echo "Getting and installing dependencies: autoconf..."
sudo apt-get install autoconf

echo "Setup node.js START..."
./nodesetup.sh
echo "Setup  node.js END..."

echo "Setup mjpg-streamer START..."
./mjpgsetup.sh
echo "Setup mjpg-streamer END..."

echo "Setup  pi-blaster START..."
./piblastersetup.sh
echo "Setup  pi-blaster END..."