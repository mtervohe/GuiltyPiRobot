echo "Getting and installing node-v0.12.4..."
wget http://nodejs.org/dist/v0.12.4/node-v0.12.4.tar.gz

echo "Unzippping node code..."
tar xvzf node-v0.12.4.tar.gz

echo "Deleting node-v0.12.4.tar.gz"
rm node-v0.12.4.tar.gz

echo "Moving node source to ../../node/node-v0.12.4-x64-source..."
mv node-v0.12.4 ../../node/node-v0.12.4

echo "Entering ../../node-source directory..."
cd ../../node/node-v0.12.4

echo "Making and installing node-v0.12.4..."
sudo ./configure --without-snapshot
make -j 4
sudo make install

echo "Check the installed version of node..."
node -v