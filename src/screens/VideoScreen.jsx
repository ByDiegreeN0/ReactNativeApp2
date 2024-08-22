import { StatusBar } from "expo-status-bar";
import {
    Button,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";

export default function App() {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [mediaType, setMediaType] = useState("video");

    useEffect(() => {
        fetchMedia(0, mediaType);
    }, [mediaType]);

    const fetchMedia = async (first, mediaType) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const media = await MediaLibrary.getAssetsAsync({
                first: first + 30,
                sortBy: MediaLibrary.SortBy.creationTime,
                mediaType:
                    mediaType === "video"
                        ? MediaLibrary.MediaType.video
                        : MediaLibrary.MediaType.image,
            });
            setGalleryFiles(media.assets);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Pressable
                onPress={() => {
                    setCurrentImage(item.uri);
                    setMediaType(item.mediaType);
                }}
            >
                {item.mediaType === "video" ? (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                ) : (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.heading}>Galería de Videos</Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    padding: 10,
                }}
            >

            </View>

            {/* view full image in modal */}
            <Modal visible={currentImage !== ""} transparent={false}>
                <View style={{ flex: 1, backgroundColor: "black" }}>
                    <Pressable
                        style={{
                            position: "absolute",
                            top: 40,
                            zIndex: 1,
                            flex: 1,
                            alignSelf: "center",
                        }}
                        title="Close"
                        onPress={() => setCurrentImage("")}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                padding: 10,
                                backgroundColor: "black",
                            }}
                        >
                            Close
                        </Text>
                    </Pressable>
                    {mediaType === "video" ? (
                        <Video
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={{
                                uri: currentImage,
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                        />
                    ) : (
                        <Image
                            source={{ uri: currentImage }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                </View>
            </Modal>
            <View style={styles.scrollContainer}>
                <FlatList
                    data={galleryFiles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    onEndReached={() => {
                        fetchMedia(galleryFiles.length, mediaType);
                    }}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
    },
    scrollContainer: {
        flex: 1,
        marginTop: 20,
        width: "100%",
    },
    heading: {
        color: "#A4133C",
        marginBottom: 20,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    imageContainer: {
        flex: 1,
        margin: 3,
        aspectRatio: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
});
