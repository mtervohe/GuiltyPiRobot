echo "Making ../mjpg-streamer directory..."
mkdir ../mjpg-streamer

echo "Entering ../mjpg-streamer directory..."
cd ../mjpg-streamer

echo "Getting and installing dependencies: subversion libv4l-dev libjpeg8-dev imagemagick fswebcam..."
sudo apt-get install subversion libv4l-dev libjpeg8-dev imagemagick fswebcam

echo "Downloading mjpg-streamer from http://sourceforge.net/code-snapshots/svn/m/mj/mjpg-streamer/code/mjpg-streamer-code-182.zip..."
wget http://sourceforge.net/code-snapshots/svn/m/mj/mjpg-streamer/code/mjpg-streamer-code-182.zip

echo "Unzippping mjpg streamer code..."
unzip mjpg-streamer-code-182.zip

echo "Entering mjpg-streamer-code-182/mjpg-streamer directory..."
cd mjpg-streamer-code-182/mjpg-streamer

echo "Making and installing mjpg-streamer..."
make USE_LIBV4L2=true clean all
sudo make DESTDIR=/usr install

