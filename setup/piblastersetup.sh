echo "Unzippping pi-blaster code..."
unzip pi-blaster-master.zip

echo "Moving pi-blaster code to ../pi-blaster..."
sudo mv pi-blaster-master ../pi-blaster

echo "Entering ../pi-blaster directory..."
cd ../pi-blaster

echo "Making and installing pi-blaster..."
./autogen.sh
./configure
make
